
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Boys = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Boys Collection</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Discover our stylish and comfortable boys' clothing, made with high-quality fabrics and authentic designs.
          </p>
          
          <div className="bg-morocco-sand/20 p-8 rounded-lg text-center mb-8">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="mb-6">We're currently updating our boys collection with new styles.</p>
            <Button asChild>
              <Link to="/">Return to Home Page</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Boys;
