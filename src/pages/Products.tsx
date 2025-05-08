import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Combine all products from different categories
const allProducts: Product[] = [
  // Trending Products
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
    id: 2,
    name: "Boys Summer T-shirt",
    price: 129,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "boys"
  },
  {
    id: 3,
    name: "Cotton Jumpsuit",
    price: 189,
    image: "https://images.unsplash.com/photo-1518831959646-28f35d4d8fbc?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "baby"
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
  // New Arrivals
  {
    id: 5,
    name: "Summer Hat Collection",
    price: 89,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 5,
    category: "accessories"
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
  },
  // Bestsellers
  {
    id: 9,
    name: "Soft Cotton Pajamas",
    price: 169,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1568337356249-fa4ac5f1d270?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 5,
    category: "baby"
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
    id: 11,
    name: "Handmade School Bag",
    price: 229,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1566454419290-57a0af3a0b6a?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 4,
    category: "accessories"
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

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
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
        sorted = [...allProducts];
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
