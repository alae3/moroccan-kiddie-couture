import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useProductStore } from "@/store/productStore";

const Products = () => {
  const { products: allProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortOption, setSortOption] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Apply filters and sorting
  const handleSort = (value: string) => {
    setSortOption(value);
    let sorted = [...filteredProducts];
    
    switch(value) {
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted = sorted.filter(product => product.isNew).concat(
          sorted.filter(product => !product.isNew)
        );
        break;
      default:
        // Keep default order
        sorted = categoryFilter === "all" 
          ? [...allProducts]
          : allProducts.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(sorted);
  };
  
  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    
    if (value === "all") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(product => product.category === value));
    }
    
    // Reapply current sort if any
    if (sortOption !== "default") {
      handleSort(sortOption);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">All Products</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Explore our complete collection of high-quality children's clothing and accessories.
          </p>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="boys">Boys</SelectItem>
                    <SelectItem value="girls">Girls</SelectItem>
                    <SelectItem value="baby">Baby</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={sortOption} onValueChange={handleSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
