
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const PromoBanner = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-xl">
          <div className="bg-gradient-to-r from-morocco-terracotta to-morocco-blue py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-moroccan-pattern opacity-10 mix-blend-overlay"></div>
            
            {/* Content */}
            <div className="md:w-1/2 text-center md:text-left z-10 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enjoy 15% Off Your First Order</h2>
              <p className="text-white/90 text-lg mb-6">
                Sign up for our newsletter and get an exclusive discount code for your first purchase.
                Plus, stay updated with our new collections and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-morocco-terracotta hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
                alt="Children in colorful clothes"
                className="w-full h-auto rounded-lg shadow-xl transform md:translate-x-12"
              />
              <div className="absolute top-4 right-4 md:-top-6 md:-left-6 bg-morocco-yellow/90 text-morocco-navy p-4 rounded-lg shadow-lg transform rotate-12 md:-rotate-12">
                <p className="text-lg font-bold">Limited Time Offer!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
