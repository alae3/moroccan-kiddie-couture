
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

// Boys products
const boysProducts = [
  {
    id: 2,
    name: "Boys Summer T-shirt",
    price: 129,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "boys"
  },
  {
    id: 6,
    name: "Lightweight Linen Shorts",
    price: 149,
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "boys"
  },
  {
    id: 10,
    name: "Casual Denim Set",
    price: 289,
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "boys"
  },
  {
    id: 12,
    name: "Winter Coat with Hood",
    price: 399,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "boys"
  }
];

const Boys = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Boys Collection</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Discover our stylish and comfortable boys' clothing, made with high-quality fabrics and authentic designs.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {boysProducts.map((product) => (
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

export default Boys;
