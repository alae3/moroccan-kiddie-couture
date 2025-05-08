
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";

const Sale = () => {
  const { products } = useProductStore();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [displayProducts, setDisplayProducts] = useState(products.filter(product => product.isSale));

  // Update displayed products when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product => 
        product.isSale && 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayProducts(filtered);
    } else {
      setDisplayProducts(products.filter(product => product.isSale));
    }
  }, [searchQuery, products]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-2">Sale Items</h1>
          <p className="text-lg text-morocco-terracotta font-medium mb-8">
            Special offers on selected items - Limited time only!
          </p>
          
          {searchQuery && (
            <div className="mb-6">
              <p className="text-md">
                Search results for: <span className="font-semibold">{searchQuery}</span>
                {' '} ({displayProducts.length} items found)
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {displayProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg mb-4">No products found matching your search.</p>
              <Button asChild>
                <Link to="/sale">View All Sale Items</Link>
              </Button>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sale;
