
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Careers</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Join our growing team at NajihKids and be part of a company that celebrates creativity, 
                diversity, and Moroccan heritage. We are always looking for passionate individuals who 
                share our values and vision.
              </p>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Why Work With Us</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-600 mb-6">
                <li><strong>Purpose-driven company:</strong> Make a positive impact through sustainable and ethical children's fashion.</li>
                <li><strong>Creative environment:</strong> Express your ideas in a collaborative and innovative workspace.</li>
                <li><strong>Growth opportunities:</strong> Develop your skills and advance your career with our supportive team.</li>
                <li><strong>Cultural experience:</strong> Engage with Moroccan artisanal craftsmanship and heritage.</li>
                <li><strong>Competitive benefits:</strong> Enjoy competitive salaries, flexible working options, and employee discounts.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Current Openings</h2>
              
              <div className="border-t border-gray-200 pt-4 pb-2 mt-4">
                <h3 className="text-xl font-medium text-morocco-navy">Design Assistant</h3>
                <p className="text-gray-500 text-sm mb-2">Casablanca, Morocco | Full-time</p>
                <p className="text-gray-600 mb-3">
                  Support our design team in creating beautiful children's clothing collections. Help with 
                  research, concept development, and the design process.
                </p>
                <button className="text-morocco-terracotta hover:underline font-medium">View Details & Apply</button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-2 mt-4">
                <h3 className="text-xl font-medium text-morocco-navy">E-commerce Specialist</h3>
                <p className="text-gray-500 text-sm mb-2">Remote | Full-time</p>
                <p className="text-gray-600 mb-3">
                  Manage our online store, optimize the customer experience, and help grow our digital presence 
                  through effective strategies and content.
                </p>
                <button className="text-morocco-terracotta hover:underline font-medium">View Details & Apply</button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-2 mt-4">
                <h3 className="text-xl font-medium text-morocco-navy">Retail Store Manager</h3>
                <p className="text-gray-500 text-sm mb-2">Marrakech, Morocco | Full-time</p>
                <p className="text-gray-600 mb-3">
                  Lead our Marrakech store operations, manage staff, and create an exceptional shopping 
                  experience for our customers.
                </p>
                <button className="text-morocco-terracotta hover:underline font-medium">View Details & Apply</button>
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-2 mt-4">
                <h3 className="text-xl font-medium text-morocco-navy">Marketing Coordinator</h3>
                <p className="text-gray-500 text-sm mb-2">Casablanca, Morocco | Full-time</p>
                <p className="text-gray-600 mb-3">
                  Support our marketing efforts through social media management, content creation, and 
                  campaign coordination.
                </p>
                <button className="text-morocco-terracotta hover:underline font-medium">View Details & Apply</button>
              </div>
              
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">Don't see a perfect fit?</h2>
              <p className="text-gray-600 mb-6">
                We're always interested in connecting with talented individuals. Send your resume and a 
                cover letter to <a href="mailto:careers@najihkids.com" className="text-morocco-terracotta hover:underline">careers@najihkids.com</a> and let us know how you can contribute to NajihKids.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
