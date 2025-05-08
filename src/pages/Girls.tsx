
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

// Girls products
const girlsProducts = [
  {
    id: 1,
    name: "Moroccan Print Dress",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 5,
    category: "girls"
  },
  {
    id: 4,
    name: "Traditional Kaftan",
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1555585466-703f14e9c14f?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 4,
    category: "girls"
  },
  {
    id: 7,
    name: "Embroidered Blouse",
    price: 199,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "girls"
  },
  {
    id: 8,
    name: "Patterned Leggings",
    price: 119,
    image: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 5,
    category: "girls"
  }
];

const Girls = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Girls Collection</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Explore our beautiful selection of girls' clothing, featuring traditional Moroccan patterns and modern designs.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {girlsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Girls;
