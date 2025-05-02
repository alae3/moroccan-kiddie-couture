
import { Shield, Truck, RefreshCw, Clock } from 'lucide-react';

const benefits = [
  {
    icon: <Truck className="h-8 w-8 text-morocco-blue" />,
    title: "Free Shipping",
    description: "Free nationwide shipping on all orders over 500 MAD",
  },
  {
    icon: <Shield className="h-8 w-8 text-morocco-terracotta" />,
    title: "Superior Quality",
    description: "Made with premium materials for long-lasting comfort",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-morocco-green" />,
    title: "Easy Returns",
    description: "30-day hassle-free return & exchange policy",
  },
  {
    icon: <Clock className="h-8 w-8 text-morocco-yellow" />,
    title: "24/7 Support",
    description: "Dedicated customer service for all your queries",
  },
];

const Benefits = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl moroccan-shadow hover-scale transition-all duration-300"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-morocco-navy">{benefit.title}</h3>
              <p className="text-morocco-navy/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
