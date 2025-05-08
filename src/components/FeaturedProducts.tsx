
import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ProductCard, { Product } from './ProductCard';
import { Link } from 'react-router-dom';

const trendingProducts: Product[] = [
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
  }
];

const newArrivals: Product[] = [
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
  }
];

const bestsellers: Product[] = [
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

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <section className="py-16 bg-morocco-sand/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Our Collection</h2>
        <p className="section-subtitle text-center">Comfortable and stylish clothing for your little ones</p>
        
        <Tabs 
          defaultValue="trending" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="border border-morocco-navy/20 bg-transparent">
              <TabsTrigger 
                value="trending"
                className={`text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white`}
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="new"
                className="text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white"
              >
                New Arrivals
              </TabsTrigger>
              <TabsTrigger 
                value="bestsellers"
                className="text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white"
              >
                Bestsellers
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="trending" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bestsellers" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-10">
          <Button 
            className="btn-secondary"
            size="lg"
            asChild
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
