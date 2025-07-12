import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Archive, Calendar, Heart, BookOpen, Download, Trash2 } from 'lucide-react';
import { Story } from './StoryDisplay';

interface WhisperArchiveProps {
  stories: Story[];
  onDeleteStory: (id: string) => void;
}

export const WhisperArchive = ({ stories, onDeleteStory }: WhisperArchiveProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const getEmotionIcon = (emotion: string) => {
    const icons = {
      joy: '✨',
      sadness: '💧',
      anger: '🔥',
      fear: '🌙',
      surprise: '⚡',
      neutral: '🌊'
    };
    return icons[emotion as keyof typeof icons] || '🌊';
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      joy: 'border-emotion-joy text-emotion-joy',
      sadness: 'border-emotion-sadness text-emotion-sadness',
      anger: 'border-emotion-anger text-emotion-anger',
      fear: 'border-emotion-fear text-emotion-fear',
      surprise: 'border-emotion-surprise text-emotion-surprise',
      neutral: 'border-emotion-neutral text-emotion-neutral'
    };
    return colors[emotion as keyof typeof colors] || colors.neutral;
  };

  const exportArchive = () => {
    const dataStr = JSON.stringify(stories, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `echorealms-archive-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (stories.length === 0) {
    return (
      <Card className="card-mystical">
        <CardContent className="p-8 text-center">
          <Archive className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground/80 mb-2">Your Archive Awaits</h3>
          <p className="text-muted-foreground">
            Begin your journey by scanning your emotions. Each story you create will be preserved here in the whisper archive.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-mystical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Archive className="h-6 w-6 text-magical-glow" />
              <div>
                <CardTitle className="text-xl text-glow">Whisper Archive</CardTitle>
                <CardDescription>
                  {stories.length} tale{stories.length !== 1 ? 's' : ''} woven from your emotions
                </CardDescription>
              </div>
            </div>
            <Button onClick={exportArchive} variant="ethereal" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Archive
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {stories.map((story) => (
                <Card
                  key={story.id}
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01] ${
                    selectedStory?.id === story.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedStory(story)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getEmotionIcon(story.emotion)}</span>
                          <h4 className="font-medium text-foreground">{story.title}</h4>
                          <Badge className={`capitalize ${getEmotionColor(story.emotion)}`} variant="outline">
                            {story.emotion}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {story.timestamp.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {(story.intensity * 100).toFixed(0)}%
                          </div>
                        </div>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {story.content.substring(0, 100)}...
                        </p>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteStory(story.id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedStory && (
        <Card className="card-mystical bg-emotion-neutral">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-magical-glow" />
              <CardTitle className="text-glow">{selectedStory.title}</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`capitalize ${getEmotionColor(selectedStory.emotion)}`} variant="outline">
                {selectedStory.emotion}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {selectedStory.timestamp.toLocaleString()}
              </span>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {selectedStory.content}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};