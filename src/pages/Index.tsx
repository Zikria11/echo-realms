import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { EmotionScanner } from '@/components/EmotionScanner';
import { StoryDisplay, Story } from '@/components/StoryDisplay';
import { WhisperArchive } from '@/components/WhisperArchive';
import { Sparkles, Heart, Book, Archive, Globe, Users } from 'lucide-react';
import heroImage from '@/assets/echorealms-hero.jpg';

const Index = () => {
  const [currentStory, setCurrentStory] = useState<{
    emotion: string;
    intensity: number;
    userInput: string;
  } | null>(null);
  const [savedStories, setSavedStories] = useState<Story[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const handleEmotionDetected = (emotion: string, intensity: number, text: string) => {
    setCurrentStory({ emotion, intensity, userInput: text });
    setActiveTab('story');
  };

  const handleSaveStory = (story: Story) => {
    setSavedStories(prev => [story, ...prev]);
    // Show success notification (could add toast here)
  };

  const handleDeleteStory = (id: string) => {
    setSavedStories(prev => prev.filter(story => story.id !== id));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-magical-glow border-magical-glow/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Beta Release
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold text-glow float-gentle">
                EchoRealms
              </h1>
              <p className="text-xl md:text-2xl text-starlight font-medium">
                Your Emotion-Based Story World
              </p>
            </div>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Step into a mystical universe where your emotions become the ink that writes extraordinary tales. 
              Every feeling you share shapes the very fabric of EchoRealms, creating stories as unique as your soul.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button 
                onClick={() => setActiveTab('scanner')} 
                variant="mystical" 
                size="lg"
                className="float-mystical"
              >
                <Heart className="h-5 w-5 mr-2" />
                Begin Your Journey
              </Button>
              <Button 
                onClick={() => setActiveTab('archive')} 
                variant="ethereal" 
                size="lg"
              >
                <Archive className="h-5 w-5 mr-2" />
                View Archive
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="scanner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="h-4 w-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Book className="h-4 w-4 mr-2" />
              Story
            </TabsTrigger>
            <TabsTrigger value="archive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-mystical">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-magical-glow" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">1</div>
                      <p className="text-sm text-foreground/80">Share your thoughts and feelings through text</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">2</div>
                      <p className="text-sm text-foreground/80">AI analyzes your emotional essence</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">3</div>
                      <p className="text-sm text-foreground/80">A personalized story unfolds in EchoRealms</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">4</div>
                      <p className="text-sm text-foreground/80">Save your tales in the Whisper Archive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-mystical">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-magical-glow" />
                    Community Features
                    <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 opacity-60">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-accent" />
                      <p className="text-sm">Global Emotion Map</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <p className="text-sm">Character Persistence</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-accent" />
                      <p className="text-sm">Voice & Visual Input</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Book className="h-4 w-4 text-accent" />
                      <p className="text-sm">Shared Story Universe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scanner" className="mt-8">
            <EmotionScanner onEmotionDetected={handleEmotionDetected} />
          </TabsContent>

          <TabsContent value="story" className="mt-8">
            {currentStory ? (
              <StoryDisplay 
                emotion={currentStory.emotion}
                intensity={currentStory.intensity}
                userInput={currentStory.userInput}
                onSaveStory={handleSaveStory}
              />
            ) : (
              <Card className="card-mystical">
                <CardContent className="p-8 text-center">
                  <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground/80 mb-2">No Story Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Use the Emotion Scanner to create your first tale in EchoRealms.
                  </p>
                  <Button onClick={() => setActiveTab('scanner')} variant="mystical">
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="archive" className="mt-8">
            <WhisperArchive 
              stories={savedStories} 
              onDeleteStory={handleDeleteStory}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
