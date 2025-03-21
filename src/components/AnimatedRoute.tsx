
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface AnimatedRouteProps {
  children: React.ReactNode;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className={`${isAnimating ? 'opacity-0' : 'opacity-100 animate-scale-in'} transition-opacity duration-300`}>
      {children}
    </div>
  );
};

export default AnimatedRoute;
