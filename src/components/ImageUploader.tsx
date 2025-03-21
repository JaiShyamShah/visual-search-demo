
import React, { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  label?: string;
  maxSizeMB?: number;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  label = "Upload an image",
  maxSizeMB = 5,
  className = "",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleImageSelection = useCallback(
    (file: File) => {
      // Validate file size
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > maxSizeMB) {
        toast.error(`Image size exceeds ${maxSizeMB}MB limit`);
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      // Create preview and pass to parent
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    },
    [maxSizeMB, onImageSelect]
  );
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageSelection(e.dataTransfer.files[0]);
      }
    },
    [handleImageSelection]
  );
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelection(e.target.files[0]);
    }
  };
  
  const removeImage = () => {
    setPreview(null);
  };
  
  return (
    <div className={`w-full ${className}`}>
      {!preview ? (
        <div
          className={`dropzone ${isDragging ? "border-primary bg-primary/5" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <Upload 
              className="h-10 w-10 mb-4 text-muted-foreground" 
              strokeWidth={1.5} 
            />
            <span className="text-lg font-medium">{label}</span>
            <p className="text-sm text-muted-foreground mt-2">
              Drag & drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Max file size: {maxSizeMB}MB)
            </p>
          </label>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden rounded-xl border border-border">
          <div className="aspect-square relative">
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full animate-blur-in"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-background transition-colors"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
