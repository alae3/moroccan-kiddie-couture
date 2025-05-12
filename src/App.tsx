
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Index from "./pages/Index";
import Girls from "./pages/Girls";
import Boys from "./pages/Boys";
import Baby from "./pages/Baby";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Admin from "./pages/Admin";
import ShippingReturns from "./pages/ShippingReturns";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import Stores from "./pages/Stores";
import Careers from "./pages/Careers";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/girls" element={<Girls />} />
          <Route path="/boys" element={<Boys />} />
          <Route path="/baby" element={<Baby />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/shipping" element={<ShippingReturns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
