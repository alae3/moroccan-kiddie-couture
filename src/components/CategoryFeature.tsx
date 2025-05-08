
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Girls Collection",
    image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?auto=format&fit=crop&w=800&q=80",
    link: "/girls"
  },
  {
    id: 2,
    title: "Boys Collection",
    image: "https://images.unsplash.com/photo-1611256243212-48a16a558a4c?auto=format&fit=crop&w=800&q=80",
    link: "/boys"
  },
  {
    id: 3,
    title: "Baby Collection",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80",
    link: "/baby"
  },
];

const CategoryFeature = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container-custom">
        <h2 className="section-title text-center mb-4">Explore Collections</h2>
        <p className="section-subtitle text-center mb-12">Discover our latest additions for your little ones</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id}
              className="group overflow-hidden relative rounded-lg moroccan-shadow hover-scale transition-all duration-300 aspect-[5/6]"
            >
              <div className="absolute inset-0 bg-moroccan-pattern opacity-10 mix-blend-overlay z-10"></div>
              <img 
                src={category.image} 
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-morocco-navy/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{category.title}</h3>
                  <span className="inline-flex items-center font-medium">
                    Shop Now
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
