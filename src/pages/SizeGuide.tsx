
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";

const SizeGuide = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Size Guide</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 mb-8">
              Find the perfect fit for your child with our comprehensive size guide. Our clothes are designed to provide 
              comfort and durability for growing children.
            </p>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">How to Measure</AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none">
                    <p>To ensure the best fit for your child, follow these measuring guidelines:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li><strong>Chest:</strong> Measure around the fullest part of the chest, keeping the tape measure horizontal.</li>
                      <li><strong>Waist:</strong> Measure around the natural waistline, at the smallest circumference.</li>
                      <li><strong>Height:</strong> Measure from the top of the head to the bottom of the feet while standing straight.</li>
                      <li><strong>Inseam:</strong> Measure from the crotch to the bottom of the ankle.</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Girls Size Chart</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Age</th>
                      <th className="border px-4 py-2 text-left">Height (cm)</th>
                      <th className="border px-4 py-2 text-left">Chest (cm)</th>
                      <th className="border px-4 py-2 text-left">Waist (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">2T</td>
                      <td className="border px-4 py-2">2 years</td>
                      <td className="border px-4 py-2">86-92</td>
                      <td className="border px-4 py-2">53</td>
                      <td className="border px-4 py-2">51</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">3T</td>
                      <td className="border px-4 py-2">3 years</td>
                      <td className="border px-4 py-2">92-98</td>
                      <td className="border px-4 py-2">55</td>
                      <td className="border px-4 py-2">52</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">4T</td>
                      <td className="border px-4 py-2">4 years</td>
                      <td className="border px-4 py-2">98-104</td>
                      <td className="border px-4 py-2">57</td>
                      <td className="border px-4 py-2">53</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">5</td>
                      <td className="border px-4 py-2">5 years</td>
                      <td className="border px-4 py-2">104-110</td>
                      <td className="border px-4 py-2">59</td>
                      <td className="border px-4 py-2">54</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">6</td>
                      <td className="border px-4 py-2">6 years</td>
                      <td className="border px-4 py-2">110-116</td>
                      <td className="border px-4 py-2">61</td>
                      <td className="border px-4 py-2">55</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Boys Size Chart</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Age</th>
                      <th className="border px-4 py-2 text-left">Height (cm)</th>
                      <th className="border px-4 py-2 text-left">Chest (cm)</th>
                      <th className="border px-4 py-2 text-left">Waist (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">2T</td>
                      <td className="border px-4 py-2">2 years</td>
                      <td className="border px-4 py-2">86-92</td>
                      <td className="border px-4 py-2">53</td>
                      <td className="border px-4 py-2">51</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">3T</td>
                      <td className="border px-4 py-2">3 years</td>
                      <td className="border px-4 py-2">92-98</td>
                      <td className="border px-4 py-2">55</td>
                      <td className="border px-4 py-2">52</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">4T</td>
                      <td className="border px-4 py-2">4 years</td>
                      <td className="border px-4 py-2">98-104</td>
                      <td className="border px-4 py-2">57</td>
                      <td className="border px-4 py-2">53</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">5</td>
                      <td className="border px-4 py-2">5 years</td>
                      <td className="border px-4 py-2">104-110</td>
                      <td className="border px-4 py-2">59</td>
                      <td className="border px-4 py-2">54</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">6</td>
                      <td className="border px-4 py-2">6 years</td>
                      <td className="border px-4 py-2">110-116</td>
                      <td className="border px-4 py-2">61</td>
                      <td className="border px-4 py-2">55</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Baby Size Chart</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Age</th>
                      <th className="border px-4 py-2 text-left">Weight (kg)</th>
                      <th className="border px-4 py-2 text-left">Height (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">0-3M</td>
                      <td className="border px-4 py-2">0-3 months</td>
                      <td className="border px-4 py-2">3-6</td>
                      <td className="border px-4 py-2">50-60</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">3-6M</td>
                      <td className="border px-4 py-2">3-6 months</td>
                      <td className="border px-4 py-2">6-8</td>
                      <td className="border px-4 py-2">60-68</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">6-9M</td>
                      <td className="border px-4 py-2">6-9 months</td>
                      <td className="border px-4 py-2">8-9</td>
                      <td className="border px-4 py-2">68-74</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border px-4 py-2">9-12M</td>
                      <td className="border px-4 py-2">9-12 months</td>
                      <td className="border px-4 py-2">9-11</td>
                      <td className="border px-4 py-2">74-80</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">12-18M</td>
                      <td className="border px-4 py-2">12-18 months</td>
                      <td className="border px-4 py-2">11-13</td>
                      <td className="border px-4 py-2">80-86</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SizeGuide;
