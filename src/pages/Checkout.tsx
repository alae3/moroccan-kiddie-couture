
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/orderStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank" | "card">("cash");
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    reference: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle bank details inputs
  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle card details inputs with validation
  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Apply specific validations based on the field
    if (name === "cardNumber") {
      // Only allow numbers and limit to 16 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
      setCardDetails((prev) => ({ ...prev, [name]: numbersOnly }));
    } 
    else if (name === "expiryMonth") {
      // Only allow numbers and limit to 2 digits (1-12)
      const numbersOnly = value.replace(/\D/g, "").slice(0, 2);
      if (parseInt(numbersOnly) > 12 && numbersOnly.length === 2) {
        return; // Don't update if value is greater than 12
      }
      setCardDetails((prev) => ({ ...prev, [name]: numbersOnly }));
    }
    else if (name === "expiryYear") {
      // Only allow numbers and limit to 2 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 2);
      setCardDetails((prev) => ({ ...prev, [name]: numbersOnly }));
    }
    else if (name === "cvv") {
      // Only allow numbers and limit to 3 or 4 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 4);
      setCardDetails((prev) => ({ ...prev, [name]: numbersOnly }));
    }
    else {
      // For other fields like cardholderName, no specific validation
      setCardDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Create a handler function that ensures the value is of the correct type
  const handlePaymentMethodChange = (value: string) => {
    // Ensure the value is either "cash", "bank", or "card" before setting the state
    if (value === "cash" || value === "bank" || value === "card") {
      setPaymentMethod(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate card details if card payment method is selected
    if (paymentMethod === "card") {
      if (cardDetails.cardNumber.length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      if (!cardDetails.cardholderName) {
        toast.error("Please enter the cardholder name");
        return;
      }
      if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
        toast.error("Please enter a valid expiry date");
        return;
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        toast.error("Please enter a valid CVV");
        return;
      }
    }
    
    // Create a new order
    const newOrder = addOrder({
      customer: formData.fullName,
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      total: getTotal(),
      status: "pending",
      items: items.map(item => `${item.name} (x${item.quantity})`),
      contact: formData.email || formData.phone,
      paymentMethod: paymentMethod
    });
    
    // Clear cart and redirect to track order page
    toast.success(`Order placed successfully! Your order number is ${newOrder.orderNumber}`);
    clearCart();
    navigate(`/track-order?order=${newOrder.orderNumber}`);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
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
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    {/* Payment Method Selection */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="cursor-pointer">Pay via Bank Transfer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer">Pay with Credit Card</Label>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === "bank" && (
                        <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                          <p className="text-sm font-medium text-gray-700">Enter Your Bank Transfer Details:</p>
                          
                          <div>
                            <label htmlFor="bankName" className="block text-sm text-gray-600 mb-1">
                              Bank Name
                            </label>
                            <Input
                              type="text"
                              id="bankName"
                              name="bankName"
                              value={bankDetails.bankName}
                              onChange={handleBankDetailsChange}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="accountNumber" className="block text-sm text-gray-600 mb-1">
                              Account Number
                            </label>
                            <Input
                              type="text"
                              id="accountNumber"
                              name="accountNumber"
                              value={bankDetails.accountNumber}
                              onChange={handleBankDetailsChange}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="accountHolder" className="block text-sm text-gray-600 mb-1">
                              Account Holder Name
                            </label>
                            <Input
                              type="text"
                              id="accountHolder"
                              name="accountHolder"
                              value={bankDetails.accountHolder}
                              onChange={handleBankDetailsChange}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="reference" className="block text-sm text-gray-600 mb-1">
                              Payment Reference
                            </label>
                            <Input
                              type="text"
                              id="reference"
                              name="reference"
                              placeholder="e.g., Your Name/Order ID"
                              value={bankDetails.reference}
                              onChange={handleBankDetailsChange}
                              className="w-full"
                            />
                          </div>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                          <p className="text-sm font-medium text-gray-700">Enter Your Credit Card Details:</p>
                          
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm text-gray-600 mb-1">
                              Card Number
                            </label>
                            <Input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.cardNumber}
                              onChange={handleCardDetailsChange}
                              className="w-full"
                              required={paymentMethod === "card"}
                              maxLength={16}
                            />
                            {cardDetails.cardNumber && cardDetails.cardNumber.length !== 16 && (
                              <p className="text-xs text-red-500 mt-1">Card number must be 16 digits</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="cardholderName" className="block text-sm text-gray-600 mb-1">
                              Cardholder Name
                            </label>
                            <Input
                              type="text"
                              id="cardholderName"
                              name="cardholderName"
                              placeholder="John Doe"
                              value={cardDetails.cardholderName}
                              onChange={handleCardDetailsChange}
                              className="w-full"
                              required={paymentMethod === "card"}
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                              <label htmlFor="expiryMonth" className="block text-sm text-gray-600 mb-1">
                                Month (MM)
                              </label>
                              <Input
                                type="text"
                                id="expiryMonth"
                                name="expiryMonth"
                                placeholder="MM"
                                value={cardDetails.expiryMonth}
                                onChange={handleCardDetailsChange}
                                className="w-full"
                                required={paymentMethod === "card"}
                                maxLength={2}
                              />
                            </div>
                            
                            <div className="col-span-1">
                              <label htmlFor="expiryYear" className="block text-sm text-gray-600 mb-1">
                                Year (YY)
                              </label>
                              <Input
                                type="text"
                                id="expiryYear"
                                name="expiryYear"
                                placeholder="YY"
                                value={cardDetails.expiryYear}
                                onChange={handleCardDetailsChange}
                                className="w-full"
                                required={paymentMethod === "card"}
                                maxLength={2}
                              />
                            </div>
                            
                            <div className="col-span-1">
                              <label htmlFor="cvv" className="block text-sm text-gray-600 mb-1">
                                CVV
                              </label>
                              <Input
                                type="text"
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={handleCardDetailsChange}
                                className="w-full"
                                required={paymentMethod === "card"}
                                maxLength={4}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full mt-6 bg-morocco-navy hover:bg-morocco-terracotta">
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)} MAD</span>
                    </div>
                  ))}
                </div>
                
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
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
