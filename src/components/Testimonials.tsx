
import { Star } from 'lucide-react';
import { useTestimonialStore } from '@/store/testimonialStore';

const Testimonials = () => {
  const { testimonials } = useTestimonialStore();

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
