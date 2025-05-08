
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TestimonialsManager from "@/components/TestimonialsManager";
import { useTestimonialStore } from "@/store/testimonialStore";
import { useProductStore } from "@/store/productStore";
import { Order, useOrderStore } from "@/store/orderStore";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

// Form schema for product validation
const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  originalPrice: z.coerce.number().positive({ message: "Price must be positive" }).optional(),
  image: z.string().url({ message: "Must be a valid URL" }),
  category: z.string().min(1, { message: "Category is required" }),
  isNew: z.boolean().optional(),
  isSale: z.boolean().optional(),
  rating: z.coerce.number().min(0).max(5).default(5),
});

type ProductFormValues = z.infer<typeof productSchema>;

const Admin = () => {
  // Access global stores
  const { products, setProducts } = useProductStore();
  const { testimonials, setTestimonials } = useTestimonialStore();
  const { orders, updateOrderStatus } = useOrderStore();
  
  const [currentTab, setCurrentTab] = useState<"products" | "orders" | "new" | "testimonials">("products");
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [orderStatusDialog, setOrderStatusDialog] = useState<{
    isOpen: boolean;
    orderId: number | null;
    status: Order['status'];
  }>({
    isOpen: false,
    orderId: null,
    status: "pending"
  });

  // Form for adding/editing products
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      category: "",
      rating: 5,
      isNew: false,
      isSale: false
    }
  });

  // Handle product form submission
  const onSubmit = (data: ProductFormValues) => {
    if (editingProduct) {
      // Edit existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...data } 
          : product
      );
      setProducts(updatedProducts);
      toast.success(`Product "${data.name}" updated successfully!`);
    } else {
      // Add new product - ensure all required fields are present
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: data.name,
        price: data.price,
        image: data.image,
        rating: data.rating,
        category: data.category,
        // Optional fields
        originalPrice: data.originalPrice,
        isNew: data.isNew,
        isSale: data.isSale
      };
      setProducts([...products, newProduct]);
      toast.success(`Product "${data.name}" added successfully!`);
    }
    
    form.reset();
    setEditingProduct(null);
    setCurrentTab("products");
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  // Edit a product
  const handleEditProduct = (product: typeof products[0]) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category || "",
      isNew: product.isNew,
      isSale: product.isSale,
      rating: product.rating
    });
    setCurrentTab("new");
  };

  // Open order status dialog
  const openOrderStatusDialog = (order: Order) => {
    setOrderStatusDialog({
      isOpen: true,
      orderId: order.id,
      status: order.status
    });
  };

  // Update order status
  const handleUpdateOrderStatus = () => {
    if (orderStatusDialog.orderId && orderStatusDialog.status) {
      updateOrderStatus(orderStatusDialog.orderId, orderStatusDialog.status);
      toast.success(`Order #${orderStatusDialog.orderId} status updated to ${orderStatusDialog.status}!`);
      setOrderStatusDialog({ isOpen: false, orderId: null, status: "pending" });
    }
  };

  // Notify about an order
  const handleNotifyOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.success(`Notification sent to ${order.customer} at ${order.contact}!`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Admin Dashboard</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Manage your products, orders, and testimonials
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 space-y-2">
              <Button 
                variant={currentTab === "products" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("products")}
              >
                Products
              </Button>
              <Button 
                variant={currentTab === "orders" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("orders")}
              >
                Orders
              </Button>
              <Button 
                variant={currentTab === "testimonials" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("testimonials")}
              >
                Testimonials
              </Button>
              <Button 
                variant={currentTab === "new" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setEditingProduct(null);
                  form.reset();
                  setCurrentTab("new");
                }}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </Button>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {currentTab === "products" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Product Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              </TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category || "N/A"}</TableCell>
                              <TableCell>
                                {product.price} MAD
                                {product.originalPrice && (
                                  <span className="line-through text-gray-500 ml-2">
                                    {product.originalPrice} MAD
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {currentTab === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>#{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>{order.items.join(", ")}</TableCell>
                              <TableCell>{order.total} MAD</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === "completed" 
                                    ? "bg-green-100 text-green-800" 
                                    : order.status === "processing"
                                      ? "bg-blue-100 text-blue-800"
                                      : order.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => openOrderStatusDialog(order)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Status
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleNotifyOrder(order.id)}
                                  >
                                    Contact
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {currentTab === "testimonials" && (
                <TestimonialsManager 
                  initialTestimonials={testimonials} 
                  onTestimonialsChange={setTestimonials}
                />
              )}
              
              {currentTab === "new" && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price (MAD)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="originalPrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Original Price (MAD, optional)</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="boys">Boys</SelectItem>
                                  <SelectItem value="girls">Girls</SelectItem>
                                  <SelectItem value="baby">Baby</SelectItem>
                                  <SelectItem value="accessories">Accessories</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="isNew"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 mt-1"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Mark as New</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="isSale"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 mt-1"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Mark as Sale</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rating (0-5)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button type="submit">
                            {editingProduct ? "Update Product" : "Add Product"}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              form.reset();
                              setEditingProduct(null);
                              setCurrentTab("products");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Order Status Dialog */}
      <Dialog 
        open={orderStatusDialog.isOpen} 
        onOpenChange={(open) => !open && setOrderStatusDialog(prev => ({ ...prev, isOpen: false }))}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="status">New Status</Label>
            <Select
              value={orderStatusDialog.status}
              onValueChange={(value: Order['status']) => 
                setOrderStatusDialog(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderStatusDialog(prev => ({ ...prev, isOpen: false }))}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrderStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Admin;
