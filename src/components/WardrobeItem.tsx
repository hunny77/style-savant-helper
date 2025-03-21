
import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

interface WardrobeItemProps {
  id: string;
  image: string;
  name: string;
  category: string;
  tags: string[];
  onRemove?: () => void;  // Added onRemove prop as optional
  onEdit?: (id: string) => void;
}

const WardrobeItem = ({ id, image, name, category, tags, onRemove, onEdit }: WardrobeItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    } else {
      setIsEditDialogOpen(true);
    }
  };

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden group bg-white"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full h-9 w-9"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="destructive" 
              className="rounded-full h-9 w-9"
              onClick={onRemove}  // Use the onRemove prop here
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
          <div className="bg-primary/10 rounded-full p-1">
            <Tag className="h-3 w-3 text-primary" />
          </div>
        </div>
        
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-block px-2 py-0.5 bg-muted text-xs rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block px-2 py-0.5 bg-muted text-xs rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* This is a placeholder for the edit dialog - you can implement this based on your needs */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Edit functionality will go here</p>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default WardrobeItem;
