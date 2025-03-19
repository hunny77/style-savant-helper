
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  tags: string[];
  image: string;
  createdAt: Date;
}

interface WardrobeContextType {
  items: WardrobeItem[];
  addItem: (item: Omit<WardrobeItem, "id" | "createdAt">) => void;
  removeItem: (id: string) => void;
  filterItems: (category: string, searchQuery: string) => WardrobeItem[];
  getCategoryCount: (category: string) => number;
  uploadImage: (file: File) => Promise<string>;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

// Initial sample data
const initialWardrobeItems: WardrobeItem[] = [
  { id: "1", name: "Blue Oxford Shirt", category: "tops", tags: ["formal", "blue", "cotton"], image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "2", name: "White T-Shirt", category: "tops", tags: ["casual", "white", "cotton"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "3", name: "Black Chinos", category: "bottoms", tags: ["formal", "black", "cotton"], image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "4", name: "Blue Jeans", category: "bottoms", tags: ["casual", "blue", "denim"], image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "5", name: "Navy Blazer", category: "outerwear", tags: ["formal", "navy", "wool"], image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "6", name: "Brown Leather Shoes", category: "footwear", tags: ["formal", "brown", "leather"], image: "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "7", name: "Black Dress", category: "dresses", tags: ["formal", "black", "polyester"], image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "8", name: "Gold Watch", category: "accessories", tags: ["formal", "gold", "metal"], image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "9", name: "Red Sweater", category: "tops", tags: ["casual", "red", "wool"], image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "10", name: "Floral Dress", category: "dresses", tags: ["casual", "floral", "cotton"], image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "11", name: "White Sneakers", category: "footwear", tags: ["casual", "white", "leather"], image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() },
  { id: "12", name: "Black Belt", category: "accessories", tags: ["formal", "black", "leather"], image: "https://images.unsplash.com/photo-1624140716840-8b6b14035dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", createdAt: new Date() }
];

export const WardrobeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const { toast } = useToast();

  // Load items from localStorage or use initial data
  useEffect(() => {
    const savedItems = localStorage.getItem("wardrobeItems");
    if (savedItems) {
      // Parse the date strings back to Date objects
      const parsedItems = JSON.parse(savedItems).map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
      setItems(parsedItems);
    } else {
      setItems(initialWardrobeItems);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("wardrobeItems", JSON.stringify(items));
    }
  }, [items]);

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app, we would upload to a server/storage service
        // For now, we'll use the base64 data URL
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const addItem = (newItem: Omit<WardrobeItem, "id" | "createdAt">) => {
    const itemWithId: WardrobeItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setItems(prevItems => [...prevItems, itemWithId]);
    
    toast({
      title: "Item added",
      description: `${newItem.name} has been added to your wardrobe`
    });
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    
    if (itemToRemove) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} has been removed from your wardrobe`
      });
    }
  };

  const filterItems = (category: string, searchQuery: string): WardrobeItem[] => {
    return items.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesCategory = category === "all" || item.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };

  const getCategoryCount = (category: string): number => {
    if (category === "all") {
      return items.length;
    }
    return items.filter(item => item.category === category).length;
  };

  return (
    <WardrobeContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      filterItems, 
      getCategoryCount,
      uploadImage 
    }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error("useWardrobe must be used within a WardrobeProvider");
  }
  return context;
};
