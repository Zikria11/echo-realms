import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Mail, Lock, User, Wand2 } from 'lucide-react';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('✨');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const emojis = ['✨', '🌟', '🔮', '🦋', '🌙', '💫', '🌸', '🦄', '🌈', '💎', '🍃', '🎭'];

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username,
            avatar_emoji: avatarEmoji
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Welcome to EchoRealms! ✨",
        description: "Check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🌟",
        description: "You've successfully signed in to EchoRealms.",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-mystical">
      <Card className="card-mystical w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Wand2 className="h-12 w-12 text-magical-glow float-gentle" />
          </div>
          <CardTitle className="text-2xl text-glow">Enter EchoRealms</CardTitle>
          <CardDescription className="text-muted-foreground">
            Where emotions shape reality
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">
                  <Lock className="inline h-4 w-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <Button
                onClick={handleSignIn}
                disabled={isLoading || !email || !password}
                variant="mystical"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Entering the realms...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enter EchoRealms
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">
                  <User className="inline h-4 w-4 mr-2" />
                  Username
                </Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="Your realm name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Choose Your Avatar</Label>
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji) => (
                    <Button
                      key={emoji}
                      type="button"
                      variant={avatarEmoji === emoji ? "mystical" : "outline"}
                      size="sm"
                      className="text-lg p-2"
                      onClick={() => setAvatarEmoji(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">
                  <Lock className="inline h-4 w-4 mr-2" />
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 border-primary/20"
                />
              </div>

              <Button
                onClick={handleSignUp}
                disabled={isLoading || !email || !password || !username}
                variant="mystical"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Creating your realm...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Join EchoRealms
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};