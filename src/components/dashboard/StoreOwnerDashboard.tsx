
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import DashboardLayout from "./DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const StoreOwnerDashboard = () => {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();

  // Mock store data
  const storeData = {
    name: "Coffee Corner Deluxe Restaurant",
    averageRating: 4.5,
    totalRatings: 124,
    recentRatings: [
      { id: "1", userName: "Alice Johnson User Account", rating: 5, comment: "Excellent service and great coffee!", date: "2024-01-15" },
      { id: "2", userName: "Bob Smith Regular Customer", rating: 4, comment: "Good food, friendly staff", date: "2024-01-14" },
      { id: "3", userName: "Carol Davis Frequent Visitor", rating: 5, comment: "Love this place! Always fresh", date: "2024-01-13" },
      { id: "4", userName: "David Wilson Local Resident", rating: 4, comment: "Nice atmosphere, reasonable prices", date: "2024-01-12" },
      { id: "5", userName: "Eva Martinez Coffee Enthusiast", rating: 5, comment: "Best coffee in town!", date: "2024-01-11" }
    ]
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-purple-100">Manage your store and view customer feedback</p>
          <Badge variant="secondary" className="mt-4 bg-white/20 text-white border-white/30">
            Store Owner
          </Badge>
        </div>

        {/* Store Overview */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl">{storeData.name}</CardTitle>
            <CardDescription>Your store performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold text-yellow-600">{storeData.averageRating}</span>
                </div>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{storeData.totalRatings}</span>
                </div>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">+8%</span>
                </div>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Customer Reviews</CardTitle>
            <CardDescription>
              Latest feedback from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeData.recentRatings.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span>{stars}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ 
                        width: `${stars === 5 ? 60 : stars === 4 ? 30 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {stars === 5 ? '74' : stars === 4 ? '37' : stars === 3 ? '10' : stars === 2 ? '3' : '0'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StoreOwnerDashboard;
