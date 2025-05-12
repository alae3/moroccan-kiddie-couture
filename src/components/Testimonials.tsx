
import { Star } from 'lucide-react';
import { useTestimonialStore } from '@/store/testimonialStore';

const Testimonials = () => {
  const { testimonials } = useTestimonialStore();
  
  return (
    <div className="py-12 bg-morocco-cream/30">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center text-morocco-navy mb-8">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-morocco-navy">{testimonial.name}</h3>
                  <p className="text-sm text-morocco-navy/70">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-morocco-yellow fill-morocco-yellow" : "text-gray-300"}`}
                  />
                ))}
              </div>
              
              <p className="text-morocco-navy/80">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
