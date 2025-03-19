
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Shirt, Plus, ArrowLeft, Search, Filter, Upload, X, Tag } from "lucide-react";
import WardrobeItem from "@/components/WardrobeItem";
import { useWardrobe } from "@/contexts/WardrobeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Wardrobe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemTags, setNewItemTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { items, addItem, removeItem, filterItems, getCategoryCount } = useWardrobe();
  const { toast } = useToast();
  
  // Categories with dynamic counts
  const categories = [
    { id: "all", label: "All Items", count: getCategoryCount("all") },
    { id: "tops", label: "Tops", count: getCategoryCount("tops") },
    { id: "bottoms", label: "Bottoms", count: getCategoryCount("bottoms") },
    { id: "outerwear", label: "Outerwear", count: getCategoryCount("outerwear") },
    { id: "dresses", label: "Dresses", count: getCategoryCount("dresses") },
    { id: "footwear", label: "Footwear", count: getCategoryCount("footwear") },
    { id: "accessories", label: "Accessories", count: getCategoryCount("accessories") }
  ];
  
  // Filter items based on search query and active category
  const filteredItems = filterItems(activeCategory, searchQuery);

  const handleAddTag = () => {
    if (tagInput.trim() && !newItemTags.includes(tagInput.trim())) {
      setNewItemTags([...newItemTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewItemTags(newItemTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddItem = () => {
    if (!newItemName || !newItemCategory) {
      toast({
        title: "Missing information",
        description: "Please provide a name and category for the item",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would upload the image to storage
    // For now, we'll use a placeholder image
    const placeholderImages: Record<string, string> = {
      tops: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bottoms: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      outerwear: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      dresses: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      footwear: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      accessories: "https://images.unsplash.com/photo-1624140716840-8b6b14035dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      default: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    };

    addItem({
      name: newItemName,
      category: newItemCategory,
      tags: newItemTags,
      image: placeholderImages[newItemCategory] || placeholderImages.default
    });

    // Reset form
    setNewItemName("");
    setNewItemCategory("");
    setNewItemTags([]);
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center p-6"
      >
        <div className="text-center">
          <Shirt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your wardrobe</p>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

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
            <h1 className="text-xl font-bold">My Wardrobe</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>
                    Add a new clothing item to your digital wardrobe
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your image here or click to browse
                    </p>
                    <Button size="sm" variant="secondary">Upload Image</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-1">
                        Item Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="e.g. Blue Oxford Shirt" 
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="text-sm font-medium block mb-1">
                        Category
                      </label>
                      <select 
                        id="category" 
                        className="w-full p-2 rounded-md border bg-background"
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value)}
                      >
                        <option value="">Select a category</option>
                        {categories.filter(cat => cat.id !== "all").map(category => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="text-sm font-medium block mb-1">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {newItemTags.map((tag, index) => (
                          <div key={index} className="flex items-center bg-secondary rounded-full px-2 py-1 text-xs">
                            {tag}
                            <button 
                              className="ml-1 text-muted-foreground hover:text-foreground"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <div className="flex-1 flex">
                          <Input 
                            className="border-0 p-0 h-7 min-w-20" 
                            placeholder="Add a tag..." 
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="px-2 h-7"
                            onClick={handleAddTag}
                          >
                            <Tag className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search wardrobe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Categories</h2>
                </div>
                <div className="divide-y">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        activeCategory === category.id 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{category.label}</span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Filter By</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {["black", "white", "blue", "red", "green", "yellow", "brown"].map(color => (
                        <button 
                          key={color}
                          className="w-6 h-6 rounded-full border-2 border-background"
                          style={{ 
                            backgroundColor: color,
                            boxShadow: "0 0 0 2px rgba(0,0,0,0.1)"
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Season</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["winter", "spring", "summer", "fall"].map(season => (
                        <button 
                          key={season}
                          className="px-2 py-1 text-xs rounded-md border hover:bg-secondary transition-colors"
                        >
                          {season.charAt(0).toUpperCase() + season.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Style</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["casual", "formal", "sporty", "outdoor"].map(style => (
                        <button 
                          key={style}
                          className="px-2 py-1 text-xs rounded-md border hover:bg-secondary transition-colors"
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-medium">
                {activeCategory === "all" 
                  ? "All Items" 
                  : categories.find(cat => cat.id === activeCategory)?.label}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({filteredItems.length} items)
                </span>
              </h2>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Newest First</DropdownMenuItem>
                    <DropdownMenuItem>Oldest First</DropdownMenuItem>
                    <DropdownMenuItem>A-Z</DropdownMenuItem>
                    <DropdownMenuItem>Most Used</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Shirt className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No results found for "${searchQuery}"`
                    : "Add some items to your wardrobe"
                  }
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                  <WardrobeItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    tags={item.tags}
                    image={item.image}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Wardrobe;
