
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup } = useAuthStore();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation (20-60 characters)
    if (formData.name.length < 20 || formData.name.length > 60) {
      newErrors.name = "Name must be between 20 and 60 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Address validation (max 400 characters)
    if (formData.address.length > 400) {
      newErrors.address = "Address must not exceed 400 characters";
    }

    // Password validation (8-16 chars, 1 uppercase, 1 special char)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be 8-16 characters with at least one uppercase letter and one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData);
      if (success) {
        toast({
          title: "Account created successfully! 🎉",
          description: "Welcome to our store rating platform!",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "Email already exists or server error",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const getCharacterCount = (text: string, min: number, max: number) => {
    const length = text.length;
    if (length < min) return `${length}/${max} (Need ${min - length} more)`;
    if (length > max) return `${length}/${max} (${length - max} over limit)`;
    return `${length}/${max}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
        <p className="text-gray-600">Join thousands of users rating stores across India</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name (20-60 characters)"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className={`transition-all duration-200 focus:scale-[1.02] h-12 ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-green-500'}`}
          />
          <div className="flex justify-between items-center">
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            <p className={`text-xs ml-auto ${
              formData.name.length < 20 ? 'text-orange-500' : 
              formData.name.length > 60 ? 'text-red-500' : 'text-green-500'
            }`}>
              {getCharacterCount(formData.name, 20, 60)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className={`transition-all duration-200 focus:scale-[1.02] h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-green-500'}`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-semibold text-gray-700">
            Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete address (max 400 characters)"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
            className={`transition-all duration-200 focus:scale-[1.02] resize-none ${errors.address ? 'border-red-500 focus:border-red-500' : 'focus:border-green-500'}`}
            rows={3}
          />
          <div className="flex justify-between items-center">
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            <p className={`text-xs ml-auto ${formData.address.length > 400 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.address.length}/400
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className={`pr-12 transition-all duration-200 focus:scale-[1.02] h-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'focus:border-green-500'}`}
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
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          <p className="text-xs text-gray-500">
            Must be 8-16 characters with uppercase letter and special character
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] h-12 text-lg font-semibold shadow-lg" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating your account...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-5 w-5" />
              Create Account
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default SignupForm;
