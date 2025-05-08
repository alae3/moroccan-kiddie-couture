
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-morocco-sand shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold text-morocco-navy tracking-tight">
                <span className="text-morocco-terracotta">Petit</span>Maroc
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              Home
            </Link>
            <Link to="/girls" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              Girls
            </Link>
            <Link to="/boys" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              Boys
            </Link>
            <Link to="/baby" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              Baby
            </Link>
            <Link to="/new-arrivals" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              New Arrivals
            </Link>
            <Link to="/sale" className="text-morocco-navy hover:text-morocco-terracotta font-medium transition-colors">
              Sale
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-morocco-terracotta text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                0
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-[500px] py-4" : "max-h-0"
        )}
      >
        <div className="container-custom flex flex-col space-y-4">
          <Link 
            to="/"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            Home
          </Link>
          <Link 
            to="/girls"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            Girls
          </Link>
          <Link 
            to="/boys"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            Boys
          </Link>
          <Link 
            to="/baby"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            Baby
          </Link>
          <Link 
            to="/new-arrivals"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            New Arrivals
          </Link>
          <Link 
            to="/sale"
            onClick={toggleMenu}
            className="text-morocco-navy font-medium py-2 border-b border-gray-100"
          >
            Sale
          </Link>
          <div className="py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-terracotta"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
