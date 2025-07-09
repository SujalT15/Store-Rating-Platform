
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { indianStates } from "@/data/indianStores";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  selectedState: string;
  selectedCity: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  className?: string;
}

const LocationSelector = ({
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
  className = ""
}: LocationSelectorProps) => {
  const selectedStateData = indianStates.find(state => state.name === selectedState);

  const handleStateChange = (newState: string) => {
    onStateChange(newState);
    onCityChange(""); // Reset city when state changes
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-blue-600" />
        <Label className="text-lg font-semibold">Select Location</Label>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state.id} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select 
            value={selectedCity} 
            onValueChange={onCityChange}
            disabled={!selectedState}
          >
            <SelectTrigger>
              <SelectValue placeholder={selectedState ? "Select a city" : "Select state first"} />
            </SelectTrigger>
            <SelectContent>
              {selectedStateData?.cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
