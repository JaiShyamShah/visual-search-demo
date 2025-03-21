
import React from "react";

interface CardProps {
  image: string;
  title?: string;
  similarity?: number;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  image, 
  title, 
  similarity, 
  onClick, 
  className = "" 
}) => {
  return (
    <div 
      className={`image-card group ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="image-container">
        <img 
          src={image} 
          alt={title || "Image"} 
          className="group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
          }}
        />
        
        {similarity !== undefined && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {Math.round(similarity * 100)}% match
          </div>
        )}
      </div>
      
      {title && (
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{title}</h3>
        </div>
      )}
    </div>
  );
};

export default Card;
