
export interface IndianState {
  id: string;
  name: string;
  cities: string[];
}

export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  overallRating: number;
  userRating: number;
  totalRatings: number;
  description: string;
}

export const indianStates: IndianState[] = [
  {
    id: "maharashtra",
    name: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati"]
  },
  {
    id: "karnataka",
    name: "Karnataka", 
    cities: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Davangere", "Shimoga", "Tumkur"]
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"]
  },
  {
    id: "kerala",
    name: "Kerala",
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur"]
  },
  {
    id: "gujarat",
    name: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"]
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner", "Kota", "Bharatpur", "Alwar"]
  },
  {
    id: "westbengal",
    name: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Kharagpur"]
  },
  {
    id: "uttarpradesh",
    name: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh"]
  },
  {
    id: "telangana",
    name: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nalgonda", "Medak"]
  },
  {
    id: "andhrapradesh",
    name: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kadapa"]
  }
];

const storeCategories = [
  "Restaurant", "Cafe", "Electronics", "Clothing", "Grocery", "Pharmacy", 
  "Bookstore", "Jewelry", "Furniture", "Sports", "Beauty", "Automobile", 
  "Mobile", "Sweets", "Bakery", "Medical", "Education", "Travel"
];

const storeNames = [
  "Royal Palace", "Golden Gate", "Silver Star", "Diamond Plaza", "Emerald Corner",
  "Sapphire Store", "Ruby Retail", "Pearl Point", "Crystal Clear", "Platinum Plus",
  "Sunshine Super", "Moonlight Mall", "Starlight Shop", "Rainbow Retail", "Galaxy Goods",
  "Ocean View", "Mountain Peak", "Valley Vibes", "River Side", "Garden Gate",
  "Heritage Hub", "Modern Mart", "Classic Corner", "Trendy Touch", "Elite Emporium",
  "Prime Plaza", "Select Store", "Choice Corner", "Quality Quarters", "Premium Point"
];

const descriptions = [
  "A premium shopping destination with excellent customer service",
  "Family-owned business serving the community for over 20 years",
  "Modern store with latest products and competitive prices",
  "Traditional store with authentic products and warm hospitality",
  "One-stop shop for all your daily needs",
  "Specialized store with expert staff and quality products",
  "Popular local store known for its fresh products",
  "Trusted name in the locality with loyal customers",
  "Contemporary store with wide variety and great deals",
  "Heritage store combining tradition with modern convenience"
];

export const generateStoresForState = (state: IndianState): Store[] => {
  const stores: Store[] = [];
  const storesPerCity = Math.ceil(18 / state.cities.length);
  
  state.cities.forEach((city, cityIndex) => {
    for (let i = 0; i < storesPerCity && stores.length < 18; i++) {
      const storeNameIndex = (cityIndex * storesPerCity + i) % storeNames.length;
      const categoryIndex = (cityIndex * 3 + i) % storeCategories.length;
      const descIndex = (cityIndex + i) % descriptions.length;
      
      stores.push({
        id: `${state.id}-${city.toLowerCase().replace(/\s+/g, '')}-${i + 1}`,
        name: `${storeNames[storeNameIndex]} ${storeCategories[categoryIndex]}`,
        category: storeCategories[categoryIndex],
        address: `${Math.floor(Math.random() * 999) + 1}, ${getRandomArea()}, ${city}, ${state.name}`,
        city,
        state: state.name,
        overallRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        userRating: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : 0,
        totalRatings: Math.floor(Math.random() * 500) + 20,
        description: descriptions[descIndex]
      });
    }
  });
  
  return stores;
};

const areas = [
  "MG Road", "Main Street", "Commercial Complex", "Market Area", "Shopping Plaza",
  "Central Avenue", "Gandhi Road", "Nehru Street", "Station Road", "Mall Road",
  "Business District", "City Center", "Old Town", "New Area", "Industrial Zone"
];

const getRandomArea = () => areas[Math.floor(Math.random() * areas.length)];

// Generate all stores
export const allIndianStores: Store[] = indianStates.flatMap(state => 
  generateStoresForState(state)
);

export const getStoresByState = (stateName: string): Store[] => {
  return allIndianStores.filter(store => store.state === stateName);
};

export const getStoresByCity = (stateName: string, cityName: string): Store[] => {
  return allIndianStores.filter(store => 
    store.state === stateName && store.city === cityName
  );
};
