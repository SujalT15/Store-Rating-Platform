
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, MapPin, Filter, Grid, List } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import DashboardLayout from "./DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import StoreRating from "@/components/rating/StoreRating";
import LocationSelector from "@/components/common/LocationSelector";
import { allIndianStores, getStoresByState, getStoresByCity, Store } from "@/data/indianStores";

const UserDashboard = () => {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getFilteredStores = (): Store[] => {
    let stores = allIndianStores;

    // Filter by location
    if (selectedState && selectedCity) {
      stores = getStoresByCity(selectedState, selectedCity);
    } else if (selectedState) {
      stores = getStoresByState(selectedState);
    }

    // Filter by search term
    if (searchTerm) {
      stores = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      stores = stores.filter(store => store.category === selectedCategory);
    }

    return stores.slice(0, 50); // Limit to 50 for performance
  };

  const filteredStores = getFilteredStores();
  const categories = [...new Set(allIndianStores.map(store => store.category))].sort();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  const handleRatingSubmit = (storeId: string, rating: number) => {
    toast({
      title: "Rating submitted",
      description: `You rated this store ${rating} stars!`,
    });
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white p-8 rounded-3xl shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-green-100 text-lg">Discover amazing stores across India</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  User Account
                </Badge>
                <div className="text-sm text-green-100">
                  {filteredStores.length} stores available
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{allIndianStores.length}</div>
                <div className="text-green-100">Total Stores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Search className="h-6 w-6 text-blue-600" />
              Find Your Perfect Store
            </CardTitle>
            <CardDescription className="text-lg">
              Search by location, category, or store name across India
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location Selector */}
            <LocationSelector
              selectedState={selectedState}
              selectedCity={selectedCity}
              onStateChange={setSelectedState}
              onCityChange={setSelectedCity}
              className="bg-white p-6 rounded-xl border shadow-sm"
            />

            {/* Search and Category Filter Row */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search stores by name, address, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-12 px-4 border-2 rounded-md focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {filteredStores.length} stores found
                </Badge>
                {selectedState && (
                  <Badge variant="secondary">
                    {selectedCity ? `${selectedCity}, ${selectedState}` : selectedState}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stores Grid/List */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredStores.map((store) => (
            <Card key={store.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-green-500 group-hover:to-blue-500 transition-all duration-300"></div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {store.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mb-2">{store.category}</Badge>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{store.address}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{store.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{store.overallRating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{store.totalRatings} reviews</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {store.userRating > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Your rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                          <span className="font-medium">{store.userRating}</span>
                        </div>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">Not rated yet</Badge>
                    )}
                  </div>
                  <StoreRating
                    storeId={store.id}
                    currentRating={store.userRating}
                    onRatingSubmit={handleRatingSubmit}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No stores found</h3>
                <p>Try adjusting your search criteria or location filters</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
