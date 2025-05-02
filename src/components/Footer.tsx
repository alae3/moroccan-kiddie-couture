
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-morocco-navy text-white pt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and about */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold tracking-tight">
                <span className="text-morocco-terracotta">Petit</span>
                <span className="text-white">Maroc</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 max-w-sm">
              Premium Moroccan-inspired children's clothing that combines 
              traditional craftsmanship with modern design for comfort and style.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* About links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Our Stores
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-morocco-terracotta transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {year} PetitMaroc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-morocco-terracotta transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-morocco-terracotta transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-morocco-terracotta transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
