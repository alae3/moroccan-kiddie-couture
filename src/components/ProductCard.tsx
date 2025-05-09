
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, originalPrice, image, isNew, isSale, rating } = product;
  
  const discount = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toast.success(`${name} added to your bag!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toast.success(`${name} added to your wishlist!`);
  };

  return (
    <Link to={`/product/${id}`} className="group relative flex flex-col">
      {/* Product image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 relative">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-morocco-blue">New</Badge>
          )}
          {isSale && (
            <Badge className="bg-morocco-terracotta">-{discount}%</Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-white hover:bg-morocco-terracotta text-morocco-navy hover:text-white rounded-full"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-white hover:bg-morocco-terracotta text-morocco-navy hover:text-white rounded-full flex gap-1 px-4"
              onClick={handleAddToBag}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Bag</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div className="flex flex-col">
        <h3 className="text-base font-medium text-morocco-navy">{name}</h3>
        
        <div className="flex gap-2 mt-1">
          {originalPrice ? (
            <>
              <span className="text-morocco-terracotta font-semibold">{price.toFixed(2)} MAD</span>
              <span className="text-gray-500 line-through">{originalPrice.toFixed(2)} MAD</span>
            </>
          ) : (
            <span className="font-semibold">{price.toFixed(2)} MAD</span>
          )}
        </div>
        
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
