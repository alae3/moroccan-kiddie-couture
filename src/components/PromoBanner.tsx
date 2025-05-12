
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useContentStore } from '@/store/contentStore';

const PromoBanner = () => {
  const { images } = useContentStore();
  
  return (
    <div className="relative overflow-hidden my-12" style={{ 
      backgroundImage: `url(${images.bannerImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container-custom py-16 md:py-24 px-6 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Special Collection</h2>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          Discover our latest collection featuring traditional Moroccan patterns with modern comfort.
        </p>
        <Button asChild size="lg" className="bg-white text-morocco-navy hover:bg-gray-100">
          <Link to="/products?collection=special">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default PromoBanner;
