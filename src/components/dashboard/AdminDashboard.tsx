
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Store, Star, Plus, Search, TrendingUp, MapPin, Award, Activity } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import DashboardLayout from "./DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { allIndianStores, indianStates } from "@/data/indianStores";

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();

  const stats = {
    totalUsers: 10247,
    totalStores: allIndianStores.length,
    totalStates: indianStates.length,
    totalRatings: 45682,
    avgRating: 4.2,
    activeUsers: 3456
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  const recentActivities = [
    { action: "New user registered from Mumbai", user: "Priya Sharma", time: "2 minutes ago", type: "user", location: "Maharashtra" },
    { action: "Store rating submitted", user: "Rajesh Kumar", time: "5 minutes ago", type: "rating", location: "Karnataka" },
    { action: "New electronics store added", user: "Tech World Bangalore", time: "15 minutes ago", type: "store", location: "Karnataka" },
    { action: "User profile updated", user: "Anita Gupta", time: "1 hour ago", type: "user", location: "Delhi" },
    { action: "Restaurant rating submitted", user: "Vikram Singh", time: "2 hours ago", type: "rating", location: "Punjab" },
    { action: "New clothing store verified", user: "Fashion Hub Chennai", time: "3 hours ago", type: "store", location: "Tamil Nadu" },
  ];

  const topPerformingStates = [
    { state: "Maharashtra", stores: Math.floor(allIndianStores.length * 0.15), avgRating: 4.3 },
    { state: "Karnataka", stores: Math.floor(allIndianStores.length * 0.12), avgRating: 4.5 },
    { state: "Tamil Nadu", stores: Math.floor(allIndianStores.length * 0.11), avgRating: 4.2 },
    { state: "Gujarat", stores: Math.floor(allIndianStores.length * 0.10), avgRating: 4.4 },
    { state: "Rajasthan", stores: Math.floor(allIndianStores.length * 0.09), avgRating: 4.1 },
  ];

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="text-blue-100 text-lg mb-4">System Administrator Dashboard</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Admin Access
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                    <Activity className="h-4 w-4 mr-2" />
                    System Active
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold">{stats.totalStores}</div>
                  <div className="text-blue-100">Total Stores</div>
                  <div className="text-sm text-blue-200 mt-1">Across {stats.totalStates} states</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-blue-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Stores</CardTitle>
              <Store className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{stats.totalStores.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Total Ratings</CardTitle>
              <Star className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{stats.totalRatings.toLocaleString()}</div>
              <p className="text-xs text-purple-600 mt-1">+25% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Avg Rating</CardTitle>
              <Award className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">{stats.avgRating}</div>
              <p className="text-xs text-orange-600 mt-1">Platform average</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-teal-700">States Covered</CardTitle>
              <MapPin className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-700">{stats.totalStates}</div>
              <p className="text-xs text-teal-600 mt-1">All major states</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-indigo-700">Active Users</CardTitle>
              <TrendingUp className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-700">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-indigo-600 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Plus className="h-6 w-6" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-lg">
              Manage users, stores, and system settings efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-24 flex flex-col gap-3 text-lg">
                <Users className="h-8 w-8" />
                Add New User
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-24 flex flex-col gap-3 text-lg">
                <Store className="h-8 w-8" />
                Add New Store
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 h-24 flex flex-col gap-3 text-lg">
                <Search className="h-8 w-8" />
                View Reports
              </Button>
              <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 h-24 flex flex-col gap-3 text-lg">
                <TrendingUp className="h-8 w-8" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Performing States */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Performing States
              </CardTitle>
              <CardDescription>States with highest store ratings and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingStates.map((state, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{state.state}</p>
                        <p className="text-sm text-gray-600">{state.stores} stores</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{state.avgRating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest system activities and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-500' : 
                        activity.type === 'store' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{activity.user}</span>
                          <Badge variant="outline" className="text-xs">{activity.location}</Badge>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
