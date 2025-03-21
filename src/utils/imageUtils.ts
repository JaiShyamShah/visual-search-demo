
import { toast } from "sonner";

export interface ImageItem {
  id: string;
  src: string;
  title?: string;
  similarity?: number;
}

// Mock database of images for demonstration
const defaultImages: ImageItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    title: "Woman with laptop",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Computer setup",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Circuit board",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    title: "Java programming",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "MacBook Pro",
  },
];

// Mock local storage key
const STORAGE_KEY = "visual_query_images";

// Initialize storage with default images
export const initializeImageStorage = (): void => {
  const storedImages = localStorage.getItem(STORAGE_KEY);
  if (!storedImages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
  }
};

// Get all images from storage
export const getAllImages = (): ImageItem[] => {
  const storedImages = localStorage.getItem(STORAGE_KEY);
  return storedImages ? JSON.parse(storedImages) : [];
};

// Add new image to storage
export const addImageToStorage = async (file: File, title?: string): Promise<ImageItem | null> => {
  try {
    // Convert file to base64 for storage (in a real app, you would upload to server)
    const base64 = await fileToBase64(file);
    
    const newImage: ImageItem = {
      id: Date.now().toString(),
      src: base64,
      title: title || file.name,
    };
    
    const currentImages = getAllImages();
    const updatedImages = [...currentImages, newImage];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    toast.success("Image added successfully");
    
    return newImage;
  } catch (error) {
    console.error("Error adding image:", error);
    toast.error("Failed to add image");
    return null;
  }
};

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Mock function to find similar images (in a real app, this would use ML/AI)
export const findSimilarImages = (queryImage: string, limit = 3): Promise<ImageItem[]> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      const allImages = getAllImages();
      
      // Assign random similarity scores (this is just a mock)
      const withSimilarity = allImages.map(img => ({
        ...img,
        // Random similarity between 0.3 and 1.0
        similarity: Math.random() * 0.7 + 0.3
      }));
      
      // Sort by similarity descending and take top matches
      const sortedResults = withSimilarity
        .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
        .slice(0, limit);
      
      resolve(sortedResults);
    }, 1500); // Simulate processing time
  });
};
