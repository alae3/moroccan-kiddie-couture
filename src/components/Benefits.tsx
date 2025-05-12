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
  return <section className="py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {})}
        </div>
      </div>
    </section>;
};
export default Benefits;