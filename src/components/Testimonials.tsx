
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amina B.",
    location: "Casablanca",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    text: "The quality of PetitMaroc's clothes is exceptional! The fabrics are soft on my daughter's skin, and the traditional patterns are beautiful. Shipping was fast, and customer service was excellent."
  },
  {
    id: 2,
    name: "Karim M.",
    location: "Rabat",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    text: "My son loves his new kaftan! The attention to detail and craftsmanship is remarkable. The size guide was very accurate, and the clothes fit perfectly. Will definitely order again."
  },
  {
    id: 3,
    name: "Leila T.",
    location: "Marrakech",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 4,
    text: "I ordered the summer collection for my twins, and I'm very impressed with the quality and design. The clothes are both stylish and comfortable. The only reason for 4 stars is that I wish they had more color options."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-morocco-blue/5">
      <div className="container-custom">
        <h2 className="section-title text-center">What Parents Say</h2>
        <p className="section-subtitle text-center mb-16">Trusted by families across Morocco and beyond</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-8 moroccan-shadow hover-scale transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-morocco-terracotta"
                />
                <div>
                  <h3 className="text-xl font-bold text-morocco-navy">{testimonial.name}</h3>
                  <p className="text-morocco-navy/70">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'fill-morocco-yellow text-morocco-yellow' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-morocco-navy/80 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
