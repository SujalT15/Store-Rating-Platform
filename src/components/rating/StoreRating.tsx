
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";

interface StoreRatingProps {
  storeId: string;
  currentRating: number;
  onRatingSubmit: (storeId: string, rating: number) => void;
}

const StoreRating = ({ storeId, currentRating, onRatingSubmit }: StoreRatingProps) => {
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    onRatingSubmit(storeId, selectedRating);
    setIsDialogOpen(false);
  };

  const resetRating = () => {
    setSelectedRating(currentRating);
    setHoverRating(0);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={currentRating > 0 ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-2"
          onClick={() => {
            setSelectedRating(currentRating);
            setIsDialogOpen(true);
          }}
        >
          <Star className="h-4 w-4" />
          {currentRating > 0 ? "Update Rating" : "Rate Store"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate This Store</DialogTitle>
          <DialogDescription>
            {currentRating > 0 
              ? `Your current rating is ${currentRating} stars. You can update it below.`
              : "How would you rate this store? Click on the stars below."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center gap-2 py-8">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              onMouseEnter={() => setHoverRating(rating)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setSelectedRating(rating)}
            >
              <Star
                className={`h-8 w-8 transition-all duration-200 ${
                  rating <= (hoverRating || selectedRating)
                    ? 'fill-yellow-400 text-yellow-400 scale-110'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            </button>
          ))}
        </div>
        
        {selectedRating > 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              You selected <span className="font-semibold">{selectedRating}</span> star{selectedRating !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              resetRating();
              setIsDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={selectedRating === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentRating > 0 ? "Update Rating" : "Submit Rating"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreRating;
