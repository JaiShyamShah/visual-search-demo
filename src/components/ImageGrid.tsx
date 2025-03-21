
import React from "react";
import Card from "./Card";

export interface ImageItem {
  id: string;
  src: string;
  title?: string;
  similarity?: number;
}

interface ImageGridProps {
  images: ImageItem[];
  onImageClick?: (image: ImageItem) => void;
  emptyMessage?: string;
  className?: string;
  columns?: number;
  loading?: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageClick,
  emptyMessage = "No images found",
  className = "",
  columns = 3,
  loading = false,
}) => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (loading) {
    return (
      <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6 ${className}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted aspect-square rounded-xl"></div>
            <div className="h-4 bg-muted rounded mt-3 w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground bg-secondary/40 rounded-xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6 ${className}`}>
      {images.map((image) => (
        <Card
          key={image.id}
          image={image.src}
          title={image.title}
          similarity={image.similarity}
          onClick={onImageClick ? () => onImageClick(image) : undefined}
          className="animate-scale-in"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
