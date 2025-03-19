
import { motion } from "framer-motion";
import { Heart, Share2, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutfitCardProps {
  images: string[];
  title: string;
  occasion: string;
  isFavorite?: boolean;
}

const OutfitCard = ({ images, title, occasion, isFavorite = false }: OutfitCardProps) => {
  return (
    <motion.div
      className="rounded-xl overflow-hidden bg-white border shadow-sm"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-3 relative">
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-lg ${
                images.length === 3 && index === 2 ? "col-span-2" : ""
              } ${
                images.length === 1 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={image}
                alt={`Outfit item ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          ))}
        </div>
        
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <Button size="icon" variant={isFavorite ? "default" : "secondary"} className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-base">{title}</h3>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <TagIcon className="h-3 w-3" />
              <span>{occasion}</span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-2">
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default OutfitCard;
