
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";

const ShippingReturns = () => {
  const { pages } = usePageContentStore();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{pages.shipping.title}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.shipping.content }} />
              
              {/* Additional shipping information */}
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Shipping Details</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Free Shipping:</strong> On all orders over 500 MAD</li>
                <li><strong>Standard Shipping:</strong> 3-5 business days</li>
                <li><strong>Express Shipping:</strong> 1-2 business days</li>
                <li><strong>International Shipping:</strong> 7-14 business days</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Returns Policy</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Returns accepted within 30 days of purchase</li>
                <li>Items must be unworn, unwashed, and with original tags attached</li>
                <li>Return shipping is the responsibility of the customer unless the item is defective</li>
                <li>Refunds will be processed within 7 business days of receiving the return</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingReturns;
