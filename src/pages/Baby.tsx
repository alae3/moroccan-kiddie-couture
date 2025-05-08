
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

// Baby products
const babyProducts = [
  {
    id: 3,
    name: "Cotton Jumpsuit",
    price: 189,
    image: "https://images.unsplash.com/photo-1518831959646-28f35d4d8fbc?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "baby"
  },
  {
    id: 9,
    name: "Soft Cotton Pajamas",
    price: 169,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1568337356249-fa4ac5f1d270?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 5,
    category: "baby"
  }
];

const Baby = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Baby Collection</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Gentle fabrics and adorable designs for your little ones, perfect for comfort and style.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {babyProducts.map((product) => (
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

export default Baby;
