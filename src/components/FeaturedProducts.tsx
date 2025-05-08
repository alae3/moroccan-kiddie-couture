
import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { products } = useProductStore();
  
  // Filter products based on categories
  const trendingProducts = useMemo(() => 
    products.filter((product, index) => index < 4), [products]
  );
  
  const newArrivals = useMemo(() => 
    products.filter(product => product.isNew).slice(0, 4), [products]
  );
  
  const bestsellers = useMemo(() => 
    products.filter((product, index) => index >= 8 && index < 12), [products]
  );

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
