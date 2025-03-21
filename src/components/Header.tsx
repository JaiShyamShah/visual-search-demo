
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ImagePlus, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-medium flex items-center space-x-2">
            <span className="bg-primary/10 text-primary p-1 rounded-md">
              <Search size={20} />
            </span>
            <span>VisualQuery</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={`p-2 rounded-full transition-colors ${
                isActive("/") 
                  ? "bg-secondary text-primary" 
                  : "hover:bg-secondary/80"
              }`}
              aria-label="Home"
            >
              <Home size={20} />
            </Link>
            <Link 
              to="/search" 
              className={`p-2 rounded-full transition-colors ${
                isActive("/search") 
                  ? "bg-secondary text-primary" 
                  : "hover:bg-secondary/80"
              }`}
              aria-label="Search Images"
            >
              <Search size={20} />
            </Link>
            <Link 
              to="/manage" 
              className={`p-2 rounded-full transition-colors ${
                isActive("/manage") 
                  ? "bg-secondary text-primary" 
                  : "hover:bg-secondary/80"
              }`}
              aria-label="Manage Images"
            >
              <ImagePlus size={20} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
