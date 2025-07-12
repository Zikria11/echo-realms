import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, Download, Share2, Sparkles, Clock } from 'lucide-react';

interface StoryDisplayProps {
  emotion: string;
  intensity: number;
  userInput: string;
  onSaveStory: (story: Story) => void;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  emotion: string;
  intensity: number;
  timestamp: Date;
  userInput: string;
}

export const StoryDisplay = ({ emotion, intensity, userInput, onSaveStory }: StoryDisplayProps) => {
  const [story, setStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Story templates based on emotions
  const storyTemplates = {
    joy: {
      titles: ["The Luminous Garden", "Echoes of Laughter", "The Golden Resonance"],
      opening: "In the radiant realm of Aurelia, where golden light dances through crystal trees,",
      themes: ["celebration", "achievement", "love", "discovery"]
    },
    sadness: {
      titles: ["The Weeping Willow's Secret", "Shadows of the Heart", "The Blue Tide"],
      opening: "Deep in the Melancholy Marshes, where silver tears form healing pools,",
      themes: ["loss", "healing", "remembrance", "hope"]
    },
    anger: {
      titles: ["The Crimson Storm", "Fury of the Phoenix", "The Burning Bridge"],
      opening: "Within the Scarlet Peaks where volcanic emotions rage,",
      themes: ["justice", "transformation", "power", "release"]
    },
    fear: {
      titles: ["Whispers in the Void", "The Shadow's Edge", "Through the Mist"],
      opening: "In the Twilight Realm where courage is born from trembling hearts,",
      themes: ["bravery", "mystery", "protection", "growth"]
    },
    surprise: {
      titles: ["The Unexpected Door", "Stardust Revelations", "The Twist of Fate"],
      opening: "At the Crossroads of Wonder, where reality shifts like quicksilver,",
      themes: ["discovery", "magic", "possibility", "adventure"]
    },
    neutral: {
      titles: ["The Balanced Path", "Echoes of Serenity", "The Quiet Strength"],
      opening: "In the Peaceful Highlands where wisdom flows like gentle streams,",
      themes: ["reflection", "peace", "wisdom", "balance"]
    }
  };

  const generateStory = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const template = storyTemplates[emotion as keyof typeof storyTemplates] || storyTemplates.neutral;
      const title = template.titles[Math.floor(Math.random() * template.titles.length)];
      const theme = template.themes[Math.floor(Math.random() * template.themes.length)];
      
      // Create a personalized story based on user input and emotion
      const storyContent = `${template.opening} a traveler much like yourself discovers something profound.

The essence of your words - "${userInput.slice(0, 50)}${userInput.length > 50 ? '...' : ''}" - ripples through the fabric of this realm, manifesting as a ${theme} that transforms everything it touches.

As the emotional currents of ${emotion} flow through the landscape with intensity ${(intensity * 100).toFixed(0)}%, the very stones begin to sing, and the ancient guardians of EchoRealms take notice.

Your journey here has only just begun, but already the realm responds to your inner world, weaving tales that mirror your soul's deepest truths. Each step forward reveals new wonders, each breath brings fresh understanding.

The story continues to unfold, shaped by the unique emotional fingerprint you've left upon this mystical world...`;

      const newStory: Story = {
        id: `story-${Date.now()}`,
        title,
        content: storyContent,
        emotion,
        intensity,
        timestamp: new Date(),
        userInput
      };

      setStory(newStory);
      setIsGenerating(false);
    }, 3000);
  };

  useEffect(() => {
    generateStory();
  }, [emotion, intensity, userInput]);

  const handleSave = () => {
    if (story) {
      onSaveStory(story);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      joy: 'bg-emotion-joy',
      sadness: 'bg-emotion-sadness',
      anger: 'bg-emotion-anger',
      fear: 'bg-emotion-fear',
      surprise: 'bg-emotion-surprise',
      neutral: 'bg-emotion-neutral'
    };
    return colors[emotion as keyof typeof colors] || colors.neutral;
  };

  if (isGenerating) {
    return (
      <Card className="card-mystical">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-magical-glow" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-glow">Weaving Your Tale</h3>
              <p className="text-muted-foreground">
                The realms are sensing your emotional essence and crafting a story just for you...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!story) return null;

  return (
    <Card className={`card-mystical ${getEmotionColor(emotion)}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="capitalize">
                {emotion}
              </Badge>
              <Badge variant="outline">
                Intensity: {(intensity * 100).toFixed(0)}%
              </Badge>
            </div>
            <CardTitle className="text-2xl text-glow">{story.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {story.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
            {story.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-primary/20">
          <Button onClick={handleSave} variant="ethereal" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save to Archive
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};