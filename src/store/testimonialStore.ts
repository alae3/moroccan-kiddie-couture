
import { create } from 'zustand';
import { Testimonial } from '@/components/TestimonialsManager';

interface TestimonialStore {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
}

const initialTestimonials: Testimonial[] = [
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

export const useTestimonialStore = create<TestimonialStore>((set) => ({
  testimonials: initialTestimonials,
  setTestimonials: (testimonials) => set({ testimonials }),
}));
