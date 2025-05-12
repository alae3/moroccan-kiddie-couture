
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";

const Careers = () => {
  const { pages } = usePageContentStore();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{pages.careers.title}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.careers.content }} />
              
              {/* Sample job listings */}
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Open Positions</h2>
              <div className="space-y-6 mt-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Store Manager - Rabat</h3>
                  <p className="text-gray-600 mb-4">We are looking for an experienced retail manager to lead our new store in Rabat.</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">Apply Now</button>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Fashion Designer - Junior</h3>
                  <p className="text-gray-600 mb-4">Join our creative team and help design our next children's clothing collection.</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">Apply Now</button>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">E-commerce Specialist</h3>
                  <p className="text-gray-600 mb-4">Help us grow our online presence and manage our digital storefront.</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">Apply Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
