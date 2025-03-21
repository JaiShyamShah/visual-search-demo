
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AnimatedRoute from "./components/AnimatedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const Search = lazy(() => import("./pages/Search"));
const Manage = lazy(() => import("./pages/Manage"));

// QueryClient for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimatedRoute><Index /></AnimatedRoute>} />
          <Route 
            path="/search" 
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <AnimatedRoute><Search /></AnimatedRoute>
              </Suspense>
            } 
          />
          <Route 
            path="/manage" 
            element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <AnimatedRoute><Manage /></AnimatedRoute>
              </Suspense>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
