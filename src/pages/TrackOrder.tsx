
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useOrderStore, Order } from "@/store/orderStore";
import { Package, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const initialOrderNumber = searchParams.get("order") || "";
  
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  
  const { orders, getOrderByNumber } = useOrderStore();

  useEffect(() => {
    // If order number is provided in URL, try to track it automatically
    if (initialOrderNumber) {
      handleTrackOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOrderNumber]);

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      toast.error("Please enter an order number");
      return;
    }

    const order = getOrderByNumber(orderNumber);
    if (order) {
      setTrackedOrder(order);
      toast.success(`Order ${order.orderNumber} found!`);
    } else {
      setTrackedOrder(null);
      toast.error("Order not found. Please check the order number and try again.");
    }
  };

  // Helper function for status icon
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case "processing":
        return <Clock className="h-12 w-12 text-blue-500" />;
      case "cancelled":
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <AlertCircle className="h-12 w-12 text-amber-500" />;
    }
  };

  // Helper function for status description
  const getStatusDescription = (status: Order['status']) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is waiting to be processed.";
      case "processing":
        return "We're preparing your items for shipment.";
      case "completed":
        return "Your order has been shipped and is on its way to you!";
      case "cancelled":
        return "This order has been cancelled. Please contact us for more information.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Track Your Order</h1>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center mb-6 gap-2">
                <Package className="h-6 w-6 text-morocco-navy" />
                <h2 className="text-2xl font-bold">Order Tracking</h2>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Enter your order number (e.g., NK-10001)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleTrackOrder}
                  className="bg-morocco-navy hover:bg-morocco-terracotta"
                >
                  Track
                </Button>
              </div>
              
              {trackedOrder ? (
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-medium text-lg mb-2">Order Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order Number</p>
                        <p className="font-medium">{trackedOrder.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{trackedOrder.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{trackedOrder.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">{trackedOrder.total} MAD</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 p-6 border rounded-lg">
                    {getStatusIcon(trackedOrder.status)}
                    <div>
                      <h3 className="text-lg font-medium capitalize mb-1">{trackedOrder.status}</h3>
                      <p className="text-gray-600">{getStatusDescription(trackedOrder.status)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Items in your order</h3>
                    <ul className="list-disc ml-6">
                      {trackedOrder.items.map((item, idx) => (
                        <li key={idx} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">
                    Enter your order number to track your package
                  </h3>
                  <p className="text-gray-500">
                    You can find your order number in the confirmation email we sent you
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackOrder;
