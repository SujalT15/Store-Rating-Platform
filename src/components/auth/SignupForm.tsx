import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", address: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup } = useAuthStore();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.length < 20 || formData.name.length > 60)
      newErrors.name = "Name must be between 20 and 60 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (formData.address.length > 400)
      newErrors.address = "Address must not exceed 400 characters";
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(formData.password))
      newErrors.password = "Password must be 8-16 characters with at least one uppercase letter and one special character";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const success = await signup(formData);
      toast({
        title: success ? "Account created successfully! 🎉" : "Signup failed",
        description: success
          ? "Welcome to our store rating platform!"
          : "Email already exists or server error",
        variant: success ? "default" : "destructive",
      });
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const getCharCount = (text: string, min: number, max: number) => {
    const len = text.length;
    if (len < min) return `${len}/${max} (Need ${min - len} more)`;
    if (len > max) return `${len}/${max} (${len - max} over limit)`;
    return `${len}/${max}`;
  };

  const baseInput = "transition-all duration-200 focus:scale-[1.02] h-12";

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
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name (20-60 characters)"
            required
            className={`${baseInput} ${errors.name ? 'border-red-500' : 'focus:border-green-500'}`}
          />
          <div className="flex justify-between items-center">
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            <p className={`text-xs ml-auto ${
              formData.name.length < 20 ? 'text-orange-500' :
              formData.name.length > 60 ? 'text-red-500' : 'text-green-500'
            }`}>
              {getCharCount(formData.name, 20, 60)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email Address <span className="text-red-500">*</span></Label>
          <Input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            required
            className={`${baseInput} ${errors.email ? 'border-red-500' : 'focus:border-green-500'}`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Enter your complete address (max 400 characters)"
            required
            rows={3}
            className={`transition-all duration-200 focus:scale-[1.02] resize-none ${errors.address ? 'border-red-500' : 'focus:border-green-500'}`}
          />
          <div className="flex justify-between items-center">
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            <p className={`text-xs ml-auto ${formData.address.length > 400 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.address.length}/400
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a strong password"
              required
              className={`${baseInput} pr-12 ${errors.password ? 'border-red-500' : 'focus:border-green-500'}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          <p className="text-xs text-gray-500">Must be 8-16 characters with uppercase letter and special character</p>
        </div>

        <Button type="submit" disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] h-12 text-lg font-semibold shadow-lg">
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

      <p className="text-center text-sm text-gray-600">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SignupForm;
