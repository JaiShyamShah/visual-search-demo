
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ImagePlus } from "lucide-react";
import Header from "@/components/Header";
import { initializeImageStorage } from "@/utils/imageUtils";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize the image storage with default images
    initializeImageStorage();
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="page-container pt-24">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto text-center py-12 md:py-24">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 animate-slide-down">
            Visual Search Made Simple
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 animate-slide-down" style={{ animationDelay: "100ms" }}>
            Upload an image to find visually similar content,
            or contribute to our image database.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in" style={{ animationDelay: "200ms" }}>
            <button
              onClick={() => navigate("/search")}
              className="glass group hover:bg-primary hover:text-primary-foreground transition-all p-8 rounded-xl border border-border flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-white/20">
                <Search size={28} className="group-hover:text-white" />
              </div>
              <h2 className="text-xl font-medium mb-2">Search Images</h2>
              <p className="text-muted-foreground group-hover:text-white/80">
                Upload an image to find similar content
              </p>
            </button>
            
            <button
              onClick={() => navigate("/manage")}
              className="glass group hover:bg-primary hover:text-primary-foreground transition-all p-8 rounded-xl border border-border flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-white/20">
                <ImagePlus size={28} className="group-hover:text-white" />
              </div>
              <h2 className="text-xl font-medium mb-2">Manage Database</h2>
              <p className="text-muted-foreground group-hover:text-white/80">
                Add images to improve search results
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
