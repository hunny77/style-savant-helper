
import React, { createContext, useContext, useState } from "react";
import { useWardrobe, WardrobeItem } from "./WardrobeContext";
import { useWeather } from "./WeatherContext";
import { useToast } from "@/components/ui/use-toast";

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  season: string;
  items: WardrobeItem[];
  createdAt: Date;
}

interface OutfitContextType {
  outfits: Outfit[];
  generateOutfit: (occasion: string) => Outfit | null;
  saveOutfit: (outfit: Omit<Outfit, "id" | "createdAt">) => void;
  removeOutfit: (id: string) => void;
  getRecommendedOutfits: () => Outfit[];
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

export const OutfitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outfits, setOutfits] = useState<Outfit[]>(() => {
    const savedOutfits = localStorage.getItem("outfits");
    if (savedOutfits) {
      // Parse the date strings back to Date objects
      return JSON.parse(savedOutfits).map((outfit: any) => ({
        ...outfit,
        createdAt: new Date(outfit.createdAt)
      }));
    }
    return [];
  });
  
  const { items } = useWardrobe();
  const { weather } = useWeather();
  const { toast } = useToast();

  // Save outfits to localStorage whenever they change
  React.useEffect(() => {
    if (outfits.length > 0) {
      localStorage.setItem("outfits", JSON.stringify(outfits));
    }
  }, [outfits]);

  const getSeason = (): string => {
    // Determine season based on weather temperature
    if (!weather) return "spring"; // default
    
    const temp = weather.temperature;
    
    if (temp < 10) return "winter";
    if (temp < 20) return "fall";
    if (temp < 30) return "spring";
    return "summer";
  };

  const generateOutfit = (occasion: string): Outfit | null => {
    // Simple outfit generation logic based on occasion and current season
    const season = getSeason();
    
    // Filter items by season and occasion
    const tops = items.filter(item => 
      item.category === "tops" && 
      (item.tags.includes(season) || !item.tags.some(tag => ["winter", "spring", "summer", "fall"].includes(tag))) &&
      (item.tags.includes(occasion) || !item.tags.some(tag => ["formal", "casual", "sporty", "outdoor"].includes(tag)))
    );
    
    const bottoms = items.filter(item => 
      item.category === "bottoms" && 
      (item.tags.includes(season) || !item.tags.some(tag => ["winter", "spring", "summer", "fall"].includes(tag))) &&
      (item.tags.includes(occasion) || !item.tags.some(tag => ["formal", "casual", "sporty", "outdoor"].includes(tag)))
    );
    
    const footwear = items.filter(item => 
      item.category === "footwear" && 
      (item.tags.includes(season) || !item.tags.some(tag => ["winter", "spring", "summer", "fall"].includes(tag))) &&
      (item.tags.includes(occasion) || !item.tags.some(tag => ["formal", "casual", "sporty", "outdoor"].includes(tag)))
    );
    
    // Check if we have enough items to create an outfit
    if (tops.length === 0 || bottoms.length === 0) {
      toast({
        title: "Cannot generate outfit",
        description: "Not enough suitable items in your wardrobe for this occasion and season",
        variant: "destructive"
      });
      return null;
    }
    
    // Randomly select items for the outfit
    const randomTop = tops[Math.floor(Math.random() * tops.length)];
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
    const outfitItems = [randomTop, randomBottom];
    
    // Add footwear if available
    if (footwear.length > 0) {
      const randomFootwear = footwear[Math.floor(Math.random() * footwear.length)];
      outfitItems.push(randomFootwear);
    }
    
    // Optional: add an accessory if available
    const accessories = items.filter(item => item.category === "accessories");
    if (accessories.length > 0) {
      const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
      outfitItems.push(randomAccessory);
    }
    
    const outfit: Outfit = {
      id: Date.now().toString(),
      name: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} outfit for ${season}`,
      occasion,
      season,
      items: outfitItems,
      createdAt: new Date()
    };
    
    return outfit;
  };

  const saveOutfit = (newOutfit: Omit<Outfit, "id" | "createdAt">) => {
    const outfitWithId: Outfit = {
      ...newOutfit,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setOutfits(prevOutfits => [...prevOutfits, outfitWithId]);
    
    toast({
      title: "Outfit saved",
      description: `${newOutfit.name} has been saved to your outfits`
    });
  };

  const removeOutfit = (id: string) => {
    const outfitToRemove = outfits.find(outfit => outfit.id === id);
    
    if (outfitToRemove) {
      setOutfits(prevOutfits => prevOutfits.filter(outfit => outfit.id !== id));
      
      toast({
        title: "Outfit removed",
        description: `${outfitToRemove.name} has been removed from your outfits`
      });
    }
  };

  const getRecommendedOutfits = (): Outfit[] => {
    // In a real app, this would use more sophisticated recommendation algorithms
    // For now, just return some saved outfits or generate new ones if none exist
    if (outfits.length >= 3) {
      return outfits.slice(0, 3);
    }
    
    const generatedOutfits: Outfit[] = [];
    const occasions = ["casual", "formal", "sporty"];
    
    for (const occasion of occasions) {
      const outfit = generateOutfit(occasion);
      if (outfit) {
        generatedOutfits.push(outfit);
      }
    }
    
    return [...outfits, ...generatedOutfits].slice(0, 3);
  };

  return (
    <OutfitContext.Provider value={{ outfits, generateOutfit, saveOutfit, removeOutfit, getRecommendedOutfits }}>
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfit = () => {
  const context = useContext(OutfitContext);
  if (context === undefined) {
    throw new Error("useOutfit must be used within an OutfitProvider");
  }
  return context;
};
