
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const PromoBanner = () => {
  return (
    <section className="bg-morocco-blue text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl font-bold mb-3">Special Summer Collection</h2>
            <p className="text-lg opacity-90">
              Discover our vibrant summer styles with 20% off this week only
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
