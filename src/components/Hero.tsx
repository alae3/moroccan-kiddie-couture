
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  position: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Bright colors, cool comfort for your little ones",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1800&q=80",
    position: "center",
    link: "/products"
  },
  {
    id: 2,
    title: "Moroccan Heritage",
    subtitle: "Traditional patterns with modern comfort",
    cta: "Discover",
    image: "https://images.unsplash.com/photo-1565462900119-a16d2b7d9946?auto=format&fit=crop&w=1800&q=80",
    position: "bottom",
    link: "/new-arrivals"
  },
  {
    id: 3,
    title: "Back to School",
    subtitle: "Ready for the classroom and playground",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1596137765040-44a1c03865f3?auto=format&fit=crop&w=1800&q=80",
    position: "center",
    link: "/products"
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={currentSlide !== index}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.position,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="container-custom h-full flex items-center relative z-10">
            <div className={`max-w-xl text-white animate-fade-in ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              <Button 
                className="bg-morocco-terracotta hover:bg-morocco-terracotta/90 text-white px-8 py-6 text-lg rounded-md"
                asChild
              >
                <Link to={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
