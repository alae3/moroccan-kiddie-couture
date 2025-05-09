
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the data to the backend
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-morocco-navy/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-morocco-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@najihkids.com" className="hover:text-morocco-terracotta">
                          info@najihkids.com
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:support@najihkids.com" className="hover:text-morocco-terracotta">
                          support@najihkids.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-morocco-navy/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-morocco-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Call Us</h3>
                      <p className="text-gray-600">
                        <a href="tel:+212522123456" className="hover:text-morocco-terracotta">
                          +212 522 123 456
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="tel:+212661234567" className="hover:text-morocco-terracotta">
                          +212 661 234 567
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-morocco-navy/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-morocco-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Visit Us</h3>
                      <address className="text-gray-600 not-italic">
                        NajihKids Store<br />
                        123 Morocco Boulevard<br />
                        Casablanca, 20000<br />
                        Morocco
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Store Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>12:00 PM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-morocco-navy mr-2" />
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-morocco-navy hover:bg-morocco-terracotta">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
