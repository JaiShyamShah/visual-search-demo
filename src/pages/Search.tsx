
import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import ImageGrid from "@/components/ImageGrid";
import { Zap, ZapOff } from "lucide-react";
import { searchImage } from "@/services/api";

interface SearchResult {
  path: string;
  similarity: number;
}

const Search = () => {
  const [searchImage, setSearchImage] = useState<{ file: File; preview: string } | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleImageSelect = (file: File, preview: string) => {
    setSearchImage({ file, preview });
    setResults([]);
  };
  
  const handleSearch = async () => {
    if (!searchImage) {
      toast.error("Please select an image to search");
      return;
    }
    
    setIsSearching(true);
    
    try {
      const similarImages = await searchImage(searchImage.file);
      
      // Convert API results to the format expected by ImageGrid
      const formattedResults = similarImages.map((result) => ({
        id: result.path,
        src: `http://localhost:8000${result.path.replace('.', '')}`,
        similarity: result.similarity,
        title: result.path.split('/').pop() || ''
      }));
      
      setResults(formattedResults);
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error instanceof Error ? error.message : "Error performing image search");
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="page-container pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="section-heading">Search Similar Images</h1>
          <p className="section-subheading">
            Upload an image to find visually similar content in our database.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-medium mb-4">Upload Search Image</h2>
              <ImageUploader 
                onImageSelect={handleImageSelect} 
                label="Upload to search"
              />
            </div>
            
            <div className="flex flex-col">
              {searchImage && (
                <>
                  <h2 className="text-xl font-medium mb-4">Ready to Search</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Click the button below to find similar images in our database.
                  </p>
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="btn-primary mt-auto mb-8 py-6 flex items-center justify-center space-x-2"
                  >
                    {isSearching ? (
                      <>
                        <ZapOff size={18} className="animate-pulse" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        <span>Find Similar Images</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          
          {(results.length > 0 || isSearching) && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-2xl font-medium mb-6">
                {isSearching ? "Finding matches..." : "Top Matches"}
              </h2>
              <ImageGrid 
                images={results} 
                columns={3}
                loading={isSearching}
                emptyMessage="No similar images found"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
