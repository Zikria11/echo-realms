-- Create enum types for better data consistency
CREATE TYPE public.emotion_type AS ENUM (
  'joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'neutral',
  'excitement', 'nostalgia', 'anxiety', 'contentment', 'frustration'
);

CREATE TYPE public.story_genre AS ENUM (
  'fantasy', 'sci-fi', 'horror', 'romance', 'mystery', 'adventure', 
  'drama', 'comedy', 'thriller', 'historical'
);

-- Users profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_emoji TEXT DEFAULT '✨',
  bio TEXT,
  preferred_genres story_genre[] DEFAULT '{}',
  privacy_setting TEXT DEFAULT 'private' CHECK (privacy_setting IN ('private', 'public', 'friends')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Emotions tracking table
CREATE TABLE public.emotions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emotion emotion_type NOT NULL,
  intensity DECIMAL(3,2) CHECK (intensity >= 0 AND intensity <= 1),
  detected_from TEXT CHECK (detected_from IN ('text', 'voice', 'facial')),
  raw_input TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Stories table
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  emotion_tag emotion_type NOT NULL,
  genre story_genre,
  is_public BOOLEAN DEFAULT false,
  bookmark_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Characters table for story continuity
CREATE TABLE public.characters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  traits JSONB DEFAULT '{}',
  appearance JSONB DEFAULT '{}',
  story_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Journal entries table
CREATE TABLE public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  detected_emotion emotion_type,
  emotion_intensity DECIMAL(3,2),
  is_public BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Achievements/badges table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  badge_emoji TEXT,
  achieved_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_name)
);

-- Echo links for emotion-matched users
CREATE TABLE public.echo_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emotion_similarity_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id != user2_id)
);

-- Story arcs for continuity
CREATE TABLE public.story_arcs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  character_ids UUID[] DEFAULT '{}',
  story_ids UUID[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.echo_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_arcs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all public profiles" ON public.profiles
FOR SELECT USING (privacy_setting = 'public' OR auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for emotions
CREATE POLICY "Users can view their own emotions" ON public.emotions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emotions" ON public.emotions
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for stories
CREATE POLICY "Users can view public stories or their own" ON public.stories
FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own stories" ON public.stories
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for characters
CREATE POLICY "Users can manage their own characters" ON public.characters
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for journal entries
CREATE POLICY "Users can view public journal entries or their own" ON public.journal_entries
FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own journal entries" ON public.journal_entries
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Users can view their own achievements" ON public.achievements
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own achievements" ON public.achievements
FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for echo links
CREATE POLICY "Users can view their own echo links" ON public.echo_links
FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create echo links" ON public.echo_links
FOR INSERT WITH CHECK (auth.uid() = user1_id);

-- RLS Policies for story arcs
CREATE POLICY "Users can manage their own story arcs" ON public.story_arcs
FOR ALL USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_emoji)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_emoji', '✨')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stories_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_characters_updated_at
  BEFORE UPDATE ON public.characters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_story_arcs_updated_at
  BEFORE UPDATE ON public.story_arcs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();