
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Frequently Asked Questions</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">General Questions</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="general-1">
                  <AccordionTrigger>What makes NajihKids clothing special?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      NajihKids combines traditional Moroccan craftsmanship with modern design to create 
                      unique, comfortable, and stylish clothing for children. Our garments are made with 
                      high-quality materials that are gentle on your child's skin while being durable 
                      enough to withstand active play and frequent washing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="general-2">
                  <AccordionTrigger>What age groups do you cater to?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      We offer clothing for babies (0-24 months), toddlers (2-4 years), and children 
                      (4-12 years). Our size guide can help you find the perfect fit for your child.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="general-3">
                  <AccordionTrigger>Are your clothes suitable for sensitive skin?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Yes! We carefully select fabrics that are gentle on sensitive skin. Many of our 
                      products are made from organic cotton and natural materials to minimize the risk 
                      of skin irritation.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Orders & Shipping</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="orders-1">
                  <AccordionTrigger>How can I track my order?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Once your order ships, you will receive a confirmation email with tracking 
                      information. You can also track your order anytime by visiting our{" "}
                      <Link to="/track-order" className="text-morocco-terracotta hover:underline">
                        Track Order
                      </Link>{" "}
                      page and entering your order number.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="orders-2">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Standard shipping within Morocco takes 3-5 business days. Express shipping is 
                      available for 1-2 business day delivery. For more details, please visit our{" "}
                      <Link to="/shipping" className="text-morocco-terracotta hover:underline">
                        Shipping & Returns
                      </Link>{" "}
                      page.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="orders-3">
                  <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Currently, we only ship within Morocco. We're working on expanding our shipping 
                      options to international destinations in the near future. Sign up for our 
                      newsletter to stay updated.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="returns-1">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      We offer a 30-day return policy. Items must be unworn, with original tags and packaging. 
                      For complete details, please visit our{" "}
                      <Link to="/shipping" className="text-morocco-terracotta hover:underline">
                        Shipping & Returns
                      </Link>{" "}
                      page.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns-2">
                  <AccordionTrigger>How do I exchange an item for a different size?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      For exchanges, we recommend returning the original item for a refund and placing a 
                      new order for the desired size. This ensures you get the correct size as quickly as 
                      possible, especially if the size you need is at risk of selling out.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns-3">
                  <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Once we receive your return, it typically takes 2-3 business days to process. After 
                      processing, refunds will appear in your account within 5-7 business days, depending on 
                      your payment method and financial institution.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Product Care</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="care-1">
                  <AccordionTrigger>How should I wash NajihKids clothing?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      We recommend machine washing our clothing in cold water with similar colors and using 
                      a gentle cycle. Avoid using bleach or harsh detergents. For detailed care instructions 
                      for specific items, please refer to the care label on each garment.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="care-2">
                  <AccordionTrigger>Can I iron NajihKids clothing?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Yes, most of our clothing can be ironed on a low to medium setting. For garments 
                      with embroidery or special details, we recommend ironing inside out to protect 
                      these features. Always check the care label for specific instructions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="care-3">
                  <AccordionTrigger>How can I maintain the quality of the clothes?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      To maintain the quality of your NajihKids clothing, we recommend washing in cold 
                      water, avoiding bleach or harsh detergents, and air-drying when possible. For stain 
                      removal, treat the stain promptly with a gentle stain remover before washing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
