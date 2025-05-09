
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrderStore, Order } from "@/store/orderStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  PackageCheck, 
  PackageX, 
  Truck 
} from "lucide-react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const { orders, updateOrderStatus } = useOrderStore();

  const handleSearch = () => {
    const id = parseInt(orderId);
    if (isNaN(id)) {
      setError("Please enter a valid order number");
      setSearchedOrder(null);
      return;
    }

    const order = orders.find(o => o.id === id);
    if (order) {
      setSearchedOrder(order);
      setError("");
    } else {
      setError("Order not found. Please check your order number and try again.");
      setSearchedOrder(null);
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="h-8 w-8 text-yellow-500" />;
      case "processing":
        return <Truck className="h-8 w-8 text-blue-500" />;
      case "completed":
        return <PackageCheck className="h-8 w-8 text-green-500" />;
      case "cancelled":
        return <PackageX className="h-8 w-8 text-red-500" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is pending processing.";
      case "processing":
        return "Your order is being processed and prepared for shipping.";
      case "completed":
        return "Your order has been delivered successfully.";
      case "cancelled":
        return "This order has been cancelled.";
    }
  };

  const handleStatusChange = (newStatus: Order["status"]) => {
    if (searchedOrder) {
      updateOrderStatus(searchedOrder.id, newStatus);
      setSearchedOrder({...searchedOrder, status: newStatus});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Track Your Order</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <p className="text-gray-600 mb-4">
              Enter your order number to track the status of your delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="text" 
                placeholder="Enter order number" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                Track Order
              </Button>
            </div>
            
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
          </div>
          
          {searchedOrder && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-4">Order #{searchedOrder.id}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Order Details</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-medium">Customer:</span> {searchedOrder.customer}</p>
                      <p><span className="font-medium">Date:</span> {searchedOrder.date}</p>
                      <p><span className="font-medium">Total:</span> {searchedOrder.total.toFixed(2)} MAD</p>
                      <p><span className="font-medium">Contact:</span> {searchedOrder.contact}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Items</h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {searchedOrder.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    {getStatusIcon(searchedOrder.status)}
                    <div className="ml-4">
                      <h3 className="text-lg font-medium capitalize">{searchedOrder.status}</h3>
                      <p className="text-gray-600">{getStatusText(searchedOrder.status)}</p>
                    </div>
                  </div>
                  
                  {/* Admin controls for changing status */}
                  <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-4">Admin: Update Order Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={searchedOrder.status === "pending" ? "default" : "outline"}
                        onClick={() => handleStatusChange("pending")}
                        size="sm"
                      >
                        Pending
                      </Button>
                      <Button 
                        variant={searchedOrder.status === "processing" ? "default" : "outline"}
                        onClick={() => handleStatusChange("processing")}
                        size="sm"
                      >
                        Processing
                      </Button>
                      <Button 
                        variant={searchedOrder.status === "completed" ? "default" : "outline"}
                        onClick={() => handleStatusChange("completed")}
                        size="sm"
                      >
                        Completed
                      </Button>
                      <Button 
                        variant={searchedOrder.status === "cancelled" ? "default" : "outline"}
                        onClick={() => handleStatusChange("cancelled")}
                        size="sm"
                        className={searchedOrder.status === "cancelled" ? "bg-red-500 hover:bg-red-600 text-white" : "hover:bg-red-500 hover:text-white"}
                      >
                        Cancelled
                      </Button>
                    </div>
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

export default TrackOrder;
