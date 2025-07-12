import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Brain, Sparkles, MessageCircle } from 'lucide-react';

interface EmotionScannerProps {
  onEmotionDetected: (emotion: string, intensity: number, text: string) => void;
}

export const EmotionScanner = ({ onEmotionDetected }: EmotionScannerProps) => {
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Simple emotion detection based on keywords (in production, use actual AI)
  const detectEmotion = (text: string) => {
    const emotions = {
      joy: ['happy', 'excited', 'wonderful', 'amazing', 'great', 'fantastic', 'love', 'perfect', 'brilliant'],
      sadness: ['sad', 'depressed', 'lonely', 'hurt', 'cry', 'tears', 'lost', 'empty', 'down'],
      anger: ['angry', 'furious', 'hate', 'mad', 'frustrated', 'annoyed', 'rage', 'upset'],
      fear: ['scared', 'afraid', 'worried', 'anxious', 'nervous', 'panic', 'terrified'],
      surprise: ['surprised', 'shocked', 'amazed', 'unexpected', 'wow', 'incredible'],
      neutral: ['okay', 'fine', 'normal', 'usual', 'regular']
    };

    const lowerText = text.toLowerCase();
    let maxCount = 0;
    let detectedEmotion = 'neutral';

    Object.entries(emotions).forEach(([emotion, keywords]) => {
      const count = keywords.reduce((acc, keyword) => {
        return acc + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (count > maxCount) {
        maxCount = count;
        detectedEmotion = emotion;
      }
    });

    return { emotion: detectedEmotion, intensity: Math.min(maxCount * 0.3 + 0.4, 1) };
  };

  const handleScan = async () => {
    if (!inputText.trim()) return;
    
    setIsScanning(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = detectEmotion(inputText);
    onEmotionDetected(result.emotion, result.intensity, inputText);
    
    setIsScanning(false);
  };

  return (
    <Card className="card-mystical">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Brain className="h-12 w-12 text-magical-glow float-gentle" />
            <Sparkles className="h-6 w-6 text-accent absolute -top-2 -right-2 float-mystical" />
          </div>
        </div>
        <CardTitle className="text-2xl text-glow">Emotion Scanner</CardTitle>
        <CardDescription className="text-muted-foreground">
          Share your thoughts and let the realms sense your emotional essence
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">
            <MessageCircle className="inline h-4 w-4 mr-2" />
            What's on your mind?
          </label>
          <Textarea
            placeholder="Pour your thoughts into the cosmic void... How are you feeling today? What's happening in your world?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] bg-muted/50 border-primary/20 focus:border-primary/50 resize-none"
            disabled={isScanning}
          />
        </div>

        <Button
          onClick={handleScan}
          disabled={!inputText.trim() || isScanning}
          variant="mystical"
          size="lg"
          className="w-full"
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
              Scanning emotional essence...
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              Scan My Emotions
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};