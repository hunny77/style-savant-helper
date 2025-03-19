
import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  preview?: string;
  onClearPreview?: () => void;
}

const FileUpload = ({ onFileSelect, preview, onClearPreview }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="mx-auto max-h-48 object-contain rounded-md" 
          />
          <button 
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation();
              onClearPreview?.();
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your image here or click to browse
          </p>
          <Button size="sm" variant="secondary" onClick={(e) => e.stopPropagation()}>
            Upload Image
          </Button>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default FileUpload;
