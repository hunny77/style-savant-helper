
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt, Plus, Calendar, RefreshCw, Settings, Layers, User } from "lucide-react";
import OutfitCard from "@/components/OutfitCard";
import WeatherDisplay from "@/components/WeatherDisplay";

const DashboardNav = () => {
  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg z-10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Wardrobify
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const recentOutfits = [
    {
      id: "1",
      title: "Summer Casual",
      occasion: "Everyday",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "2",
      title: "Work Meeting",
      occasion: "Business",
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1598033128892-a4bbfa99336e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ]
    },
    {
      id: "3",
      title: "Weekend Outing",
      occasion: "Casual",
      images: [
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
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
      <DashboardNav />
      
      <div className="pt-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <WeatherDisplay compact />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-2 rounded-full p-2 bg-primary/10">
                        <Shirt className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">42</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Outfits Created</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-2 rounded-full p-2 bg-primary/10">
                        <Layers className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Outfit Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-2 rounded-full p-2 bg-primary/10">
                        <RefreshCw className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">5</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="outfits" className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="outfits">Recent Outfits</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                  
                  <Link to="/outfits">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                
                <TabsContent value="outfits" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                      Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
                      ))
                    ) : (
                      recentOutfits.map((outfit) => (
                        <OutfitCard 
                          key={outfit.id} 
                          title={outfit.title} 
                          occasion={outfit.occasion} 
                          images={outfit.images} 
                          isFavorite={outfit.id === "2"}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="mt-0">
                  <div className="rounded-lg border p-8 text-center">
                    <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Daily Recommendations</h3>
                    <p className="text-muted-foreground mb-4">
                      Get AI-powered outfit suggestions based on weather, occasions, and your style.
                    </p>
                    <Button>Generate Recommendations</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="mt-0">
                  <div className="rounded-lg border p-8 text-center">
                    <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Outfit Calendar</h3>
                    <p className="text-muted-foreground mb-4">
                      Plan your outfits ahead of time for special events and daily wear.
                    </p>
                    <Button>Open Calendar</Button>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Quick Actions</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <Plus className="h-5 w-5" />, label: "Add Item", path: "/wardrobe" },
                    { icon: <Layers className="h-5 w-5" />, label: "Create Outfit", path: "/outfits" },
                    { icon: <RefreshCw className="h-5 w-5" />, label: "Get Recommendations", path: "/outfits" },
                    { icon: <Calendar className="h-5 w-5" />, label: "Plan Outfits", path: "/outfits" }
                  ].map((action, index) => (
                    <Link key={index} to={action.path}>
                      <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardContent className="flex flex-col items-center justify-center py-6">
                          <div className="rounded-full p-3 bg-secondary mb-2">
                            {action.icon}
                          </div>
                          <p className="text-sm font-medium">{action.label}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
                  ) : (
                    <OutfitCard 
                      title="Casual Office Day" 
                      occasion="Work" 
                      images={[
                        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                        "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                      ]} 
                    />
                  )}
                </CardContent>
              </Card>
              
              <WeatherDisplay />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recently Added Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-12 bg-muted rounded-lg animate-pulse"></div>
                    ))
                  ) : (
                    [
                      { name: "Blue Oxford Shirt", category: "Tops", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
                      { name: "Black Chinos", category: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
                      { name: "Brown Leather Shoes", category: "Footwear", image: "https://images.unsplash.com/photo-1617952236317-289d70f8c8ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
