
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";

const Sustainability = () => {
  const { pages } = usePageContentStore();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{pages.sustainability.title}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.sustainability.content }} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
