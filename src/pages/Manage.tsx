
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import ImageGrid from "@/components/ImageGrid";
import { ImagePlus } from "lucide-react";
import { addImage } from "@/services/api";

interface ImageItem {
  id: string;
  src: string;
  title?: string;
}

const Manage = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploadImage, setUploadImage] = useState<{ file: File; preview: string } | null>(null);
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to load images from default_images folder
  const loadImages = async () => {
    setIsLoading(true);
    
    try {
      // For simplicity, we're just loading a list of files from the default_images directory
      // In a real app, you would have an API endpoint to list all images
      const defaultImagesDir = "./default_images";
      
      // Create a placeholder array of images based on filenames
      // In production, this would come from a backend API
      const dummyImages: ImageItem[] = [
        "target_1.jpg", "target_2.jpg", "target_3.jpg", "target_4.jpg", 
        "target_5.jpg", "target_6.jpg", "target_7.jpg", "target_8.jpg", 
        "target_9.jpg", "target_10.jpg"
      ].map(filename => ({
        id: filename,
        src: `${defaultImagesDir}/${filename}`,
        title: filename.split('.')[0]
      }));
      
      setImages(dummyImages);
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Failed to load images from database");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Load images on component mount
    loadImages();
  }, []);
  
  const handleImageSelect = (file: File, preview: string) => {
    setUploadImage({ file, preview });
    // Use filename as default title
    setTitle(file.name.split(".")[0]);
  };
  
  const handleAddImage = async () => {
    if (!uploadImage) return;
    
    setIsAdding(true);
    
    try {
      const message = await addImage(uploadImage.file);
      toast.success(message || "Image added successfully");
      
      // Reload images to show the newly added one
      await loadImages();
      
      // Reset form
      setUploadImage(null);
      setTitle("");
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add image");
    } finally {
      setIsAdding(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="page-container pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="section-heading">Manage Image Database</h1>
          <p className="section-subheading">
            Add new images to improve search results and expand the database.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-medium mb-4">Add New Image</h2>
                <ImageUploader 
                  onImageSelect={handleImageSelect}
                  label="Upload to database" 
                />
                
                {uploadImage && (
                  <div className="mt-4 animate-fade-in">
                    <label className="block text-sm font-medium mb-2">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-md border border-input px-4 py-2 mb-4"
                      placeholder="Enter a title for this image"
                    />
                    
                    <button
                      onClick={handleAddImage}
                      disabled={isAdding || !title.trim()}
                      className="btn-primary w-full py-5 flex items-center justify-center space-x-2"
                    >
                      <ImagePlus size={18} />
                      <span>{isAdding ? "Adding..." : "Add to Database"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-xl font-medium mb-6">Current Database</h2>
              <ImageGrid 
                images={images} 
                columns={2}
                loading={isLoading}
                emptyMessage="No images in database yet"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Manage;
