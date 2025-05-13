import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useProductStore } from '@/store/productStore';
import { useAuthStore } from '@/store/authStore';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const {
    products
  } = useProductStore();
  const {
    isAuthenticated
  } = useAuthStore();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };
  return <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-morocco-sand shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold text-morocco-navy tracking-tight">
                <span className="text-morocco-terracotta">Najih</span>Kids
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
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Search Bar - Shown when search is toggled */}
        {isSearchOpen && <div className="hidden md:block py-3 border-t border-morocco-sand animate-fadeIn">
            <form onSubmit={handleSearch} className="relative">
              <Input type="text" placeholder="Search for products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-terracotta" autoFocus />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={toggleSearch}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>}
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out", isMenuOpen ? "max-h-[500px] py-4" : "max-h-0")}>
        <div className="container-custom flex flex-col space-y-4">
          <Link to="/" onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            Home
          </Link>
          <Link to="/girls" onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            Girls
          </Link>
          <Link to="/boys" onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            Boys
          </Link>
          <Link to="/baby" onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            Baby
          </Link>
          <Link to="/stores" onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            Our Stores
          </Link>
          <Link to={isAuthenticated ? "/admin" : "/login"} onClick={toggleMenu} className="text-morocco-navy font-medium py-2 border-b border-gray-100">
            {isAuthenticated ? "Admin Dashboard" : "Admin Login"}
          </Link>
          <div className="py-2">
            <form onSubmit={handleSearch} className="relative">
              <Input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-morocco-terracotta" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button type="submit" variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;