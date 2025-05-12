
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sustainability = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Sustainability</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                At NajihKids, sustainability is at the heart of everything we do. We believe in creating 
                clothing that not only looks good but does good for the planet and the people involved 
                in making our products.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-6">
                We are committed to reducing our environmental impact through mindful production practices, 
                ethical sourcing, and creating durable products that stand the test of time. From the 
                materials we choose to the partnerships we form, sustainability guides our decisions.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Sustainable Materials</h2>
              <p className="text-gray-600 mb-6">
                We carefully select materials that are kind to the environment and safe for children:
              </p>
              <ul className="list-disc pl-5 space-y-3 text-gray-600 mb-6">
                <li><strong>Organic Cotton:</strong> The majority of our cotton is GOTS-certified organic, grown without harmful pesticides or synthetic fertilizers.</li>
                <li><strong>Natural Dyes:</strong> We use natural, plant-based dyes whenever possible, reducing chemical usage and water pollution.</li>
                <li><strong>Recycled Materials:</strong> We incorporate recycled fabrics and materials into our collections to reduce waste.</li>
                <li><strong>Low-impact Packaging:</strong> Our packaging is made from recycled and biodegradable materials.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Ethical Production</h2>
              <p className="text-gray-600 mb-6">
                We work with small workshops and artisans who are paid fair wages and work in safe conditions. 
                Many of our products are handcrafted using traditional techniques, preserving cultural heritage 
                while creating employment opportunities.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Community Impact</h2>
              <p className="text-gray-600 mb-6">
                We believe in giving back to the communities that inspire our designs. A portion of our 
                profits supports education initiatives for children in Morocco, particularly in artisan 
                communities where traditional crafts are practiced.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Our Journey</h2>
              <p className="text-gray-600">
                Sustainability is a journey, not a destination. We're continuously learning, improving, 
                and finding new ways to reduce our footprint. We welcome your suggestions and feedback 
                as we work towards creating a better future for our children through conscious fashion choices.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
