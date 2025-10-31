import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { login, isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Try admin/admin123');
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      toast.error('Please enter username and password');
      return;
    }
    const success = await register(newUsername, newPassword);
    if (success) {
      toast.success('Account created! You can now log in.');
      setShowRegister(false);
      setUsername(newUsername);
      setPassword('');
    } else {
      toast.error('Registration failed. Username may already exist.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-ocean p-4">
      <Card className="w-full max-w-md shadow-elevated animate-fade-in">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/images/logo/Logo.png" alt="AquaWatch Logo" className="h-full w-full object-contain" />
          </div>
          <CardTitle className="text-3xl font-bold">AquaWatch</CardTitle>
          <CardDescription className="text-base">
            Fish Pond Monitoring System
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showRegister ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="new-username"
                  type="text"
                  placeholder="Choose a username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="transition-all focus:shadow-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Choose a password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="transition-all focus:shadow-card"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-ocean">Create Account</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setShowRegister(false)}>Back to Login</Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="transition-all focus:shadow-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all focus:shadow-card"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-ocean hover:opacity-90 transition-all shadow-card hover:shadow-elevated"
              >
                Sign In
              </Button>
              <Button type="button" variant="ghost" className="w-full mt-2" onClick={() => setShowRegister(true)}>
                Create Account
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Default: admin / admin123
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
