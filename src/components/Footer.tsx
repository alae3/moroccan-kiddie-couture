import { Link } from 'react-router-dom';
import { Instagram, Facebook, X } from 'lucide-react';
import { useSocialStore } from '@/store/socialStore';
const Footer = () => {
  const year = new Date().getFullYear();
  const {
    socialLinks
  } = useSocialStore();
  return <footer className="bg-morocco-navy text-white pt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and about */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold tracking-tight">
                <span className="text-morocco-terracotta">Najih</span>
                <span className="text-white">Kids</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 max-w-sm">
              Premium Moroccan-inspired children's clothing that combines 
              traditional craftsmanship with modern design for comfort and style.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>}
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  <X className="h-6 w-6" />
                </a>}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/girls" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/boys" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/baby" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          {/* About links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Sustainability
                </Link>
              </li>
              
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {year} NajihKids. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            
            
            
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;