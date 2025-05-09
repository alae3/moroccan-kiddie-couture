
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Your Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-morocco-navy/20 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6 text-center">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium mb-4">Cart Items ({items.length})</h2>
                  
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-morocco-terracotta">
                              {item.name}
                            </Link>
                            <span className="font-medium">
                              {item.price.toFixed(2)} MAD
                            </span>
                          </div>
                          
                          {item.category && (
                            <span className="text-sm text-gray-500 capitalize">
                              {item.category}
                            </span>
                          )}
                          
                          {/* Quantity Controls */}
                          <div className="mt-2 flex justify-between">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-white hover:bg-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{getTotal().toFixed(2)} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 mb-6">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="text-morocco-terracotta">{getTotal().toFixed(2)} MAD</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-morocco-navy hover:bg-morocco-terracotta">
                      Proceed to Checkout
                    </Button>
                    
                    <Link to="/track-order" className="block text-center text-morocco-navy hover:text-morocco-terracotta">
                      Track your order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
