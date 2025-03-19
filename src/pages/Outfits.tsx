
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Calendar, Layers } from "lucide-react";
import OutfitCard from "@/components/OutfitCard";
import WeatherDisplay from "@/components/WeatherDisplay";

const Outfits = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data
  const outfits = [
    {
      id: "1",
      title: "Summer Casual",
      occasion: "Everyday",
      category: "casual",
      isFavorite: true,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "2",
      title: "Business Meeting",
      occasion: "Formal",
      category: "formal",
      isFavorite: false,
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "3",
      title: "Weekend Brunch",
      occasion: "Casual",
      category: "casual",
      isFavorite: false,
      images: [
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1624140716840-8b6b14035dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "4",
      title: "Dinner Date",
      occasion: "Evening",
      category: "formal",
      isFavorite: true,
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "5",
      title: "Beach Day",
      occasion: "Vacation",
      category: "casual",
      isFavorite: false,
      images: [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "6",
      title: "Job Interview",
      occasion: "Formal",
      category: "formal",
      isFavorite: false,
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
  ];
  
  // Filter outfits based on active tab
  const filteredOutfits = outfits.filter(outfit => {
    if (activeTab === "all") return true;
    if (activeTab === "favorites") return outfit.isFavorite;
    return outfit.category === activeTab;
  });
  
  // AI Recommendations
  const recommendations = [
    {
      id: "rec1",
      title: "Today's Outfit",
      occasion: "Work",
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "rec2",
      title: "Weekend Casual",
      occasion: "Weekend",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "rec3",
      title: "Date Night",
      occasion: "Evening",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background pb-20"
    >
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-lg z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Outfits</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <WeatherDisplay compact />
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Outfit
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="myOutfits" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="myOutfits">My Outfits</TabsTrigger>
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="myOutfits" className="mt-6">
                <div className="mb-6">
                  <TabsList>
                    <TabsTrigger value="all" onClick={() => setActiveTab("all")} data-selected={activeTab === "all"}>All</TabsTrigger>
                    <TabsTrigger value="casual" onClick={() => setActiveTab("casual")} data-selected={activeTab === "casual"}>Casual</TabsTrigger>
                    <TabsTrigger value="formal" onClick={() => setActiveTab("formal")} data-selected={activeTab === "formal"}>Formal</TabsTrigger>
                    <TabsTrigger value="favorites" onClick={() => setActiveTab("favorites")} data-selected={activeTab === "favorites"}>Favorites</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredOutfits.map((outfit) => (
                    <OutfitCard
                      key={outfit.id}
                      title={outfit.title}
                      occasion={outfit.occasion}
                      images={outfit.images}
                      isFavorite={outfit.isFavorite}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recommendations.map((outfit) => (
                    <OutfitCard
                      key={outfit.id}
                      title={outfit.title}
                      occasion={outfit.occasion}
                      images={outfit.images}
                    />
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Get More Recommendations
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <WeatherDisplay />
            
            <div className="rounded-lg border overflow-hidden">
              <div className="p-4 border-b bg-card">
                <h2 className="font-medium">Upcoming Events</h2>
              </div>
              <div className="p-4 space-y-4">
                {[
                  { date: "Oct 15", title: "Team Meeting", time: "09:00 AM" },
                  { date: "Oct 18", title: "Dinner Reservation", time: "07:30 PM" },
                  { date: "Oct 20", title: "Weekend Trip", time: "All day" }
                ].map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {event.date} · {event.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Plan Outfit
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <div className="p-4 border-b bg-card">
                <h2 className="font-medium">Style Stats</h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Most Worn Style</span>
                    <span className="font-medium">Casual</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Favorite Color</span>
                    <span className="font-medium">Blue</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Total Outfits</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Most Versatile Item</span>
                    <span className="font-medium">Blue Oxford Shirt</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Layers className="h-4 w-4 mr-2" />
                    View All Stats
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Outfits;
