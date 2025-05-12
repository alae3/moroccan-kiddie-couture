
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Stores = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Our Stores</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 mb-8">
              Visit our stores to explore our full collection and experience the quality of our products firsthand.
              Our friendly staff is ready to help you find the perfect items for your children.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Store Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Casablanca Flagship Store</h3>
                  <p className="text-gray-600 mb-2">123 Morocco Mall, Ain Diab</p>
                  <p className="text-gray-600 mb-2">Casablanca, Morocco</p>
                  <p className="text-gray-600 mb-2">+212 522 123 456</p>
                  <p className="text-gray-600 mb-4">Open daily: 10:00 AM - 8:00 PM</p>
                  <button className="text-morocco-terracotta hover:underline">Get Directions</button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Store Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Marrakech Boutique</h3>
                  <p className="text-gray-600 mb-2">45 Menara Mall</p>
                  <p className="text-gray-600 mb-2">Marrakech, Morocco</p>
                  <p className="text-gray-600 mb-2">+212 524 789 012</p>
                  <p className="text-gray-600 mb-4">Open daily: 10:00 AM - 7:00 PM</p>
                  <button className="text-morocco-terracotta hover:underline">Get Directions</button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Store Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Rabat Store</h3>
                  <p className="text-gray-600 mb-2">78 Mega Mall, Hay Riad</p>
                  <p className="text-gray-600 mb-2">Rabat, Morocco</p>
                  <p className="text-gray-600 mb-2">+212 537 456 789</p>
                  <p className="text-gray-600 mb-4">Open daily: 10:00 AM - 8:00 PM</p>
                  <button className="text-morocco-terracotta hover:underline">Get Directions</button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Coming Soon</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">Tangier Store (Coming Soon)</h3>
                  <p className="text-gray-600 mb-2">15 Tangier City Mall</p>
                  <p className="text-gray-600 mb-2">Tangier, Morocco</p>
                  <p className="text-gray-600 mb-4">Opening Fall 2025</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">Store Events</h2>
              <p className="text-gray-600 mb-4">
                We regularly host events at our stores, including new collection launches, 
                children's activities, and special promotions. Follow us on social media or 
                join our newsletter to stay updated on upcoming events.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stores;
