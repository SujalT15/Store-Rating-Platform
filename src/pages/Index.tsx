
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Store, ShieldCheck, MapPin, TrendingUp, Award, Globe, ArrowRight } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useAuthStore } from "@/store/authStore";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user) {
    return <Dashboard />;
  }

  const features = [
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Dedicated dashboards for administrators, users, and store owners with tailored features",
      color: "blue"
    },
    {
      icon: MapPin,
      title: "India-Wide Coverage",
      description: "Discover and rate stores across all Indian states and major cities",
      color: "green"
    },
    {
      icon: Store,
      title: "Comprehensive Directory",
      description: "Browse thousands of stores across multiple categories and locations",
      color: "purple"
    },
    {
      icon: Star,
      title: "Smart Rating System",
      description: "Rate and review stores with our intuitive 5-star rating system",
      color: "yellow"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Store owners get detailed insights and analytics about their ratings",
      color: "red"
    },
    {
      icon: ShieldCheck,
      title: "Secure Platform",
      description: "Advanced security with role-based permissions and data protection",
      color: "indigo"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Registered Users", icon: Users },
    { number: "15,000+", label: "Listed Stores", icon: Store },
    { number: "28", label: "Indian States", icon: MapPin },
    { number: "4.8/5", label: "Platform Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Star className="h-4 w-4" />
              India's Premier Store Rating Platform
              <Globe className="h-4 w-4" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-8 leading-tight">
              Rate. Review. <br />
              <span className="relative">
                Discover.
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with thousands of stores across India, share authentic experiences, and help fellow shoppers make informed decisions with our comprehensive rating ecosystem.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Auth Section */}
          <div className="max-w-md mx-auto">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl rounded-3xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get Started
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Join our community of store reviewers
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger 
                      value="login" 
                      className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger 
                      value="signup"
                      className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-0">
                    <LoginForm />
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-0">
                    <SignupForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="text-center text-sm text-gray-500 px-8 pb-8">
                <p>Trusted by thousands of users across India</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
