
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Welcome to NajihKids, a Moroccan-inspired children's clothing brand dedicated to 
                creating beautiful, comfortable, and sustainable clothing for kids of all ages.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2020, NajihKids was born from a passion for Moroccan artisanal craftsmanship 
                and a desire to create children's clothing that celebrates cultural heritage while 
                meeting modern needs. Our founder, inspired by her Moroccan roots and experiences 
                as a mother, wanted to create a brand that blends traditional patterns and techniques 
                with contemporary designs.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At NajihKids, our mission is to dress children in clothing that is not only beautiful and 
                comfortable but also tells a story. We believe in preserving cultural traditions while 
                creating modern, practical pieces that children love to wear. Every garment we create 
                is designed with care, focusing on quality, comfort, and ethical production.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Values</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-600 mb-6">
                <li><strong>Quality:</strong> We use premium materials and skilled craftsmanship to create durable pieces that last.</li>
                <li><strong>Heritage:</strong> We celebrate Moroccan culture through our designs, connecting children to beautiful traditions.</li>
                <li><strong>Sustainability:</strong> We are committed to ethical practices and environmental responsibility.</li>
                <li><strong>Inclusivity:</strong> We create clothing for all children, regardless of gender, size, or background.</li>
                <li><strong>Community:</strong> We support local artisans and give back to communities in Morocco.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Team</h2>
              <p className="text-gray-600 mb-6">
                Behind NajihKids is a dedicated team of designers, artisans, and professionals who share 
                a passion for children's fashion and Moroccan heritage. Many of our designs are created 
                in collaboration with skilled craftspeople in Morocco, ensuring authentic techniques and 
                patterns are incorporated into our collections.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
