
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Camera, User, Heart, ShoppingBag, X, Menu } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { initializeImageStorage } from "@/utils/imageUtils";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ImageUploader from "@/components/ImageUploader";

const Index = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // For visual search functionality
  const handleVisualSearch = (file: File, preview: string) => {
    navigate("/search", { state: { file, preview } });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy search - just navigate to search page
    if (searchValue.trim()) {
      navigate("/search");
    }
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {/* Top Navigation Bar */}
      <div className="bg-black text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden md:flex space-x-4 text-xs">
            <a href="#" className="hover:text-gray-300">FREE SHIPPING ON ORDERS $75+</a>
            <a href="#" className="hover:text-gray-300">EASY RETURNS</a>
            <a href="#" className="hover:text-gray-300">TRACK ORDER</a>
          </div>
          <div className="text-xs md:text-sm font-bold">
            EXTRA 30% OFF ALL SALE | CODE: EXTRA30
          </div>
          <div className="hidden md:flex space-x-4 text-xs">
            <a href="#" className="hover:text-gray-300">DOWNLOAD APP</a>
            <a href="#" className="hover:text-gray-300">CONTACT US</a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Logo */}
            <div className="text-xl font-bold">
              <a href="/" className="flex items-center">
                VisualNova
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#" className="hover:text-primary">WOMEN</a>
              <a href="#" className="hover:text-primary">CURVES</a>
              <a href="#" className="hover:text-primary">MEN</a>
              <a href="#" className="hover:text-primary">KIDS</a>
              <a href="#" className="hover:text-primary">BEAUTY</a>
              <a href="#" className="hover:text-primary">SALE</a>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="hover:text-primary"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <a href="#account" className="hover:text-primary hidden md:block">
                <User size={20} />
              </a>
              <a href="#wishlist" className="hover:text-primary hidden md:block">
                <Heart size={20} />
              </a>
              <a href="#cart" className="hover:text-primary relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  3
                </span>
              </a>
            </div>
          </div>
          
          {/* Search Bar */}
          {searchOpen && (
            <div className="py-3 border-t border-gray-200">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Search VisualNova..."
                    className="pr-10 pl-4 py-2 border-gray-300 rounded-l-md"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-primary"
                      onClick={() => setShowVisualSearch(!showVisualSearch)}
                      aria-label="Visual Search"
                    >
                      <Camera size={18} />
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800"
                >
                  Search
                </button>
              </form>
              
              {/* Visual Search Uploader */}
              {showVisualSearch && (
                <div className="mt-3 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <h3 className="text-sm font-medium mb-2">Visual Search</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Upload an image to find similar products
                  </p>
                  <ImageUploader 
                    onImageSelect={handleVisualSearch}
                    label="Upload image to search"
                  />
                </div>
              )}
            </div>
          )}
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <nav className="flex flex-col space-y-3 text-sm font-medium">
                <a href="#" className="hover:text-primary">WOMEN</a>
                <a href="#" className="hover:text-primary">CURVES</a>
                <a href="#" className="hover:text-primary">MEN</a>
                <a href="#" className="hover:text-primary">KIDS</a>
                <a href="#" className="hover:text-primary">BEAUTY</a>
                <a href="#" className="hover:text-primary">SALE</a>
                <div className="h-px bg-gray-200 my-1"></div>
                <a href="#account" className="hover:text-primary flex items-center">
                  <User size={16} className="mr-2" />
                  <span>My Account</span>
                </a>
                <a href="#wishlist" className="hover:text-primary flex items-center">
                  <Heart size={16} className="mr-2" />
                  <span>Wishlist</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero Banner */}
      <div className="bg-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Style</h1>
            <p className="text-gray-600 text-lg mb-8">
              Use our visual search to find exactly what you're looking for
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/search")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6"
              >
                <Camera className="mr-2" size={18} />
                Try Visual Search
              </Button>
              <Button
                onClick={() => navigate("/manage")}
                variant="outline"
                className="px-8 py-6"
              >
                Manage Image Database
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Categories */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Dresses', 'Tops', 'Jeans', 'Shoes'].map((category) => (
              <div key={category} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">Shop Now</span>
                  </div>
                </div>
                <h3 className="mt-2 text-center font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* New Arrivals */}
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">New Arrivals</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CarouselItem key={item} className="md:basis-1/3 lg:basis-1/4">
                  <div className="group cursor-pointer p-1">
                    <div className="aspect-[3/4] bg-gray-200 rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium">Quick View</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Heart size={20} className="text-white hover:text-red-500 transition-colors duration-200" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm truncate">Product Name Example {item}</h3>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm font-bold">$49.99</span>
                        <span className="text-xs text-gray-500 line-through">$79.99</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-4"/>
            <CarouselNext className="mr-4"/>
          </Carousel>
        </div>
      </div>
      
      {/* Visual Search Promo */}
      <div className="py-12 bg-gradient-to-r from-primary/10 to-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Find Your Style With Visual Search</h2>
              <p className="text-gray-600 mb-6">
                Upload any image and discover similar items in our collection. Our AI-powered visual search
                makes finding exactly what you want easier than ever.
              </p>
              <Button
                onClick={() => navigate("/search")}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Camera className="mr-2" size={16} />
                Try Visual Search Now
              </Button>
            </div>
            <div className="md:w-1/2 aspect-video bg-gray-200 rounded-md">
              {/* Placeholder for visual search demo image */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HELP & INFORMATION</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
                <li><a href="#" className="hover:text-white">Delivery & Returns</a></li>
                <li><a href="#" className="hover:text-white">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">ABOUT VISUALNOVA</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Corporate Responsibility</a></li>
                <li><a href="#" className="hover:text-white">Investors Site</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">SHOP WITH US</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Women</a></li>
                <li><a href="#" className="hover:text-white">Men</a></li>
                <li><a href="#" className="hover:text-white">Kids</a></li>
                <li><a href="#" className="hover:text-white">Beauty</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">JOIN OUR COMMUNITY</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465.985-.047 1.372-.06 3.808-.06zm0 1.664c-2.136 0-2.389.01-3.233.048-.78.036-1.203.166-1.485.276-.373.145-.64.318-.92.598-.28.28-.453.546-.598.92-.11.281-.24.705-.276 1.485-.038.844-.047 1.097-.047 3.233s.01 2.389.048 3.233c.036.78.166 1.203.276 1.485.145.373.318.64.598.92.28.28.546.453.92.598.282.11.705.24 1.485.276.844.038 1.097.047 3.233.047s2.389-.01 3.233-.048c.78-.036 1.203-.166 1.485-.276.373-.145.64-.318.92-.598.28-.28.453-.546.598-.92.11-.282.24-.705.276-1.485.038-.844.047-1.097.047-3.233s-.01-2.389-.048-3.233c-.036-.78-.166-1.203-.276-1.485a2.471 2.471 0 00-.598-.92 2.471 2.471 0 00-.92-.598c-.282-.11-.705-.24-1.485-.276-.844-.038-1.097-.047-3.233-.047z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
              <form className="mb-4">
                <p className="text-sm text-gray-300 mb-2">Sign up for our newsletter</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 bg-gray-800 text-white text-sm rounded-l-md focus:outline-none flex-grow"
                  />
                  <button className="bg-white text-black px-4 py-2 text-sm font-bold rounded-r-md">
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>&copy; 2024 VisualNova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
