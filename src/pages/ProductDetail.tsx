import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Edit } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
const ProductDetail = () => {
  const {
    productId
  } = useParams();
  const {
    products,
    updateProduct
  } = useProductStore();
  const {
    addItem
  } = useCartStore();

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(0);
  const [editedDescription, setEditedDescription] = useState("");

  // Find the product by ID
  const product = products.find(p => p.id === Number(productId));

  // Set initial values for editing
  useState(() => {
    if (product) {
      setEditedRating(product.rating);
      setEditedDescription(product.description || "This premium product is made with high-quality materials, perfect for your child's comfort and style. Designed with attention to detail and Moroccan-inspired elements.");
    }
  });

  // Handle add to cart
  const handleAddToBag = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to your bag!`);
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (product) {
      updateProduct({
        ...product,
        rating: editedRating,
        description: editedDescription
      });
      setIsEditing(false);
      toast.success("Product updated successfully!");
    }
  };
  if (!product) {
    return <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container-custom py-12 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>;
  }

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : 0;
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <Link to="/products" className="inline-flex items-center text-morocco-navy hover:text-morocco-terracotta mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-morocco-navy mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex mb-4 items-center">
                {isEditing ? <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(star => <button key={star} onClick={() => setEditedRating(star)} className="focus:outline-none">
                        <svg className={`w-5 h-5 ${star <= editedRating ? "text-yellow-400" : "text-gray-300"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </button>)}
                    <span className="ml-2 text-sm text-gray-500">({editedRating}/5)</span>
                  </div> : <>
                    {[...Array(5)].map((_, i) => <svg key={i} className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>)}
                    <span className="ml-2 text-sm text-gray-500">({product.rating}/5)</span>
                    
                  </>}
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-morocco-terracotta">
                  {product.price.toFixed(2)} MAD
                </span>
                
                {product.originalPrice && <>
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} MAD
                    </span>
                    <span className="bg-morocco-terracotta text-white text-sm px-2 py-1 rounded">
                      -{discountPercentage}%
                    </span>
                  </>}
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 mb-6">
                {product.isNew && <span className="bg-morocco-blue text-white text-xs px-2 py-1 rounded">New Arrival</span>}
                {product.isSale && <span className="bg-morocco-terracotta text-white text-xs px-2 py-1 rounded">On Sale</span>}
                {product.category && <span className="bg-morocco-navy text-white text-xs px-2 py-1 rounded capitalize">
                    {product.category}
                  </span>}
              </div>
              
              {/* Description */}
              <div className="prose mb-8">
                {isEditing ? <textarea value={editedDescription} onChange={e => setEditedDescription(e.target.value)} className="w-full h-32 p-2 border rounded-md" /> : <p className="text-gray-600">
                    {product.description || "This premium product is made with high-quality materials, perfect for your child's comfort and style. Designed with attention to detail and Moroccan-inspired elements."}
                  </p>}
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                {isEditing ? <>
                    <Button onClick={handleSaveChanges} className="bg-morocco-navy hover:bg-morocco-terracotta">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </> : <>
                    <Button onClick={handleAddToBag} size="lg" className="flex gap-2 bg-morocco-navy hover:bg-morocco-terracotta">
                      <ShoppingBag className="h-5 w-5" />
                      Add to Cart
                    </Button>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default ProductDetail;