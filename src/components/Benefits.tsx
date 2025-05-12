
import { Shield, Truck, RefreshCw, Clock } from 'lucide-react';

const benefits = [{
  icon: <Truck className="h-8 w-8 text-morocco-blue" />,
  title: "Free Shipping",
  description: "Free nationwide shipping on all orders over 500 MAD"
}, {
  icon: <Shield className="h-8 w-8 text-morocco-terracotta" />,
  title: "Superior Quality",
  description: "Made with premium materials for long-lasting comfort"
}, {
  icon: <RefreshCw className="h-8 w-8 text-morocco-green" />,
  title: "Easy Returns",
  description: "30-day hassle-free return & exchange policy"
}, {
  icon: <Clock className="h-8 w-8 text-morocco-yellow" />,
  title: "24/7 Support",
  description: "Dedicated customer service for all your queries"
}];

const Benefits = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
