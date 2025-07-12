import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, LogOut, Trophy, BookOpen } from 'lucide-react';

type StoryGenre = 'fantasy' | 'sci-fi' | 'horror' | 'romance' | 'mystery' | 'adventure' | 'drama' | 'comedy' | 'thriller' | 'historical';

interface Profile {
  id: string;
  username: string;
  avatar_emoji: string;
  bio: string;
  preferred_genres: StoryGenre[];
  privacy_setting: string;
}

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [storyCount, setStoryCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emojis = ['✨', '🌟', '🔮', '🦋', '🌙', '💫', '🌸', '🦄', '🌈', '💎', '🍃', '🎭'];
  const genres: StoryGenre[] = ['fantasy', 'sci-fi', 'horror', 'romance', 'mystery', 'adventure', 'drama', 'comedy', 'thriller', 'historical'];

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAchievements();
      fetchStoryCount();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user?.id)
        .order('achieved_on', { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchStoryCount = async () => {
    try {
      const { count, error } = await supabase
        .from('stories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      if (error) throw error;
      setStoryCount(count || 0);
    } catch (error) {
      console.error('Error fetching story count:', error);
    }
  };

  const updateProfile = async () => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          avatar_emoji: profile.avatar_emoji,
          bio: profile.bio,
          preferred_genres: profile.preferred_genres,
          privacy_setting: profile.privacy_setting
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profile updated! ✨",
        description: "Your EchoRealms profile has been saved.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Until next time! 🌙",
      description: "You've successfully signed out of EchoRealms.",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="card-mystical">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-mystical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{profile.avatar_emoji}</div>
              <div>
                <CardTitle className="text-glow">{profile.username}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label>Avatar</Label>
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji) => (
                    <Button
                      key={emoji}
                      type="button"
                      variant={profile.avatar_emoji === emoji ? "mystical" : "outline"}
                      size="sm"
                      className="text-lg p-2"
                      onClick={() => setProfile({ ...profile, avatar_emoji: emoji })}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us about your emotional journey..."
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Preferred Genres</Label>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <Button
                      key={genre}
                      type="button"
                      variant={profile.preferred_genres.includes(genre) ? "mystical" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newGenres = profile.preferred_genres.includes(genre)
                          ? profile.preferred_genres.filter(g => g !== genre)
                          : [...profile.preferred_genres, genre];
                        setProfile({ ...profile, preferred_genres: newGenres });
                      }}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={updateProfile} variant="mystical" className="w-full">
                Save Changes
              </Button>
            </>
          ) : (
            <>
              {profile.bio && (
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              )}

              {profile.preferred_genres.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Preferred Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferred_genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-magical-glow mr-2" />
                    <span className="text-2xl font-bold text-glow">{storyCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Stories Created</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-5 w-5 text-magical-glow mr-2" />
                    <span className="text-2xl font-bold text-glow">{achievements.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {achievements.length > 0 && (
        <Card className="card-mystical">
          <CardHeader>
            <CardTitle className="text-glow">
              <Trophy className="inline h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 border border-primary/10">
                  <div className="text-2xl">{achievement.badge_emoji}</div>
                  <div>
                    <h4 className="font-medium">{achievement.badge_name}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.badge_description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};