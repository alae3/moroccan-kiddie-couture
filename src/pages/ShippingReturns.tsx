
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { Truck, Package, RefreshCcw } from "lucide-react";

const ShippingReturns = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Shipping & Returns</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="bg-morocco-navy/10 p-4 rounded-full mb-4">
                  <Truck className="h-8 w-8 text-morocco-navy" />
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Shipping</h3>
                <p className="text-gray-600">
                  We ship within 1-2 business days across Morocco
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-morocco-navy/10 p-4 rounded-full mb-4">
                  <Package className="h-8 w-8 text-morocco-navy" />
                </div>
                <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-gray-600">
                  Free shipping on all orders over 500 MAD
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-morocco-navy/10 p-4 rounded-full mb-4">
                  <RefreshCcw className="h-8 w-8 text-morocco-navy" />
                </div>
                <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
                <p className="text-gray-600">
                  30-day return policy for all items
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  At NajihKids, we strive to deliver your orders as quickly as possible. Please review 
                  our shipping policy below:
                </p>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">Processing Time</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        All orders are processed within 1-2 business days (excluding weekends and holidays) 
                        after receiving your order confirmation email. You will receive another notification 
                        when your order has shipped.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">Shipping Methods & Costs</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Standard Shipping: 30 MAD (3-5 business days)</li>
                        <li>Express Shipping: 60 MAD (1-2 business days)</li>
                        <li>FREE Standard Shipping on all orders over 500 MAD</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">Shipping Locations</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We currently ship to all major cities and regions throughout Morocco. 
                        For remote areas, additional shipping time and fees may apply.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  We want you to be completely satisfied with your purchase. If you're not entirely happy, 
                  we're here to help.
                </p>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">Return Policy</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        You have 30 days from the date of delivery to return your item. To be eligible for a return, 
                        your item must be in the same condition that you received it, unworn or unused, with tags, 
                        and in its original packaging.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">How to Return</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Contact our customer service team at returns@najihkids.com</li>
                        <li>Our team will send you a return label and instructions</li>
                        <li>Pack the item securely with all original packaging and tags</li>
                        <li>Attach the provided return label</li>
                        <li>Drop off the package at the nearest post office or courier service</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">Refunds</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Once your return is received and inspected, we will send you an email to notify you that 
                        we have received your returned item. We will also notify you of the approval or rejection 
                        of your refund.
                      </p>
                      <p className="mt-2">
                        If approved, your refund will be processed, and a credit will automatically be applied to 
                        your original method of payment within 5-7 business days.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">Exchanges</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        If you need to exchange an item for a different size or color, please follow the same 
                        return process and place a new order for the desired item. This ensures you get the 
                        item you want as quickly as possible.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingReturns;
