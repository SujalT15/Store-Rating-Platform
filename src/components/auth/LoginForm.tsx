import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { Badge } from "@/components/ui/badge";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back! 🎉",
          description: "Login successful. Redirecting to your dashboard...",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: "Admin", email: "admin@example.com", password: "Admin123!", color: "bg-red-500" },
    { role: "User", email: "user@example.com", password: "User123!", color: "bg-green-500" },
    { role: "Store Owner", email: "store@example.com", password: "Store123!", color: "bg-blue-500" }
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your store ratings dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-all duration-200 focus:scale-[1.02] h-12 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-12 transition-all duration-200 focus:scale-[1.02] h-12 focus:border-blue-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] h-12 text-lg font-semibold shadow-lg" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </>
          )}
        </Button>
      </form>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-100">
        <div className="text-center mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">
            🚀 Demo Credentials
          </Badge>
        </div>
        <p className="font-semibold text-gray-800 mb-3 text-center">Try different user roles:</p>
        <div className="grid gap-3">
          {demoCredentials.map((cred, index) => (
            <div 
              key={index}
              className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => fillDemoCredentials(cred.email, cred.password)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${cred.color}`}></div>
                  <div>
                    <div className="font-semibold text-gray-800">{cred.role}</div>
                    <div className="text-sm text-gray-600">{cred.email}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Click to fill
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">
          Click any credential above to auto-fill the login form
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
