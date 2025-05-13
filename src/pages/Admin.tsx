import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useTestimonialStore } from "@/store/testimonialStore";
import { useProductStore } from "@/store/productStore";
import { Order, useOrderStore } from "@/store/orderStore";
import { Edit, Eye, Mail, MessageSquare, Trash2, Upload, Image, Settings, LogOut, Users, FileText, Truck, BarChart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { useSocialStore } from "@/store/socialStore";
import { useMessageStore, Message } from "@/store/messageStore";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useContentStore, WebsiteContent, WebsiteImages } from "@/store/contentStore";
import { useAuthStore } from "@/store/authStore";
import { usePageContentStore } from "@/store/pageContentStore";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CategoryFeatureManager from "@/components/CategoryFeatureManager";
import { useCategoryStore } from "@/store/categoryStore";

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

// Website content schema
const contentSchema = z.object({
  heroTitle: z.string().min(3, { message: "Title must be at least 3 characters" }),
  heroSubtitle: z.string(),
  heroButtonText: z.string(),
  aboutTitle: z.string(),
  aboutDescription: z.string(),
  featuredTitle: z.string(),
  contactTitle: z.string(),
  contactSubtitle: z.string(),
  footerText: z.string(),
});

// Pages content schema
const pageContentSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
});

type ProductFormValues = z.infer<typeof productSchema>;
type ContentFormValues = z.infer<typeof contentSchema>;
type PageContentFormValues = z.infer<typeof pageContentSchema>;

const Admin = () => {
  // Access global stores
  const { products, setProducts } = useProductStore();
  const { testimonials, setTestimonials } = useTestimonialStore();
  const { orders, updateOrderStatus, deleteOrder } = useOrderStore();
  const { socialLinks, updateSocialLinks } = useSocialStore();
  const { messages, markAsRead, deleteMessage } = useMessageStore();
  const { textContent, images, updateTextContent, updateImage } = useContentStore();
  const { pages, updatePage } = usePageContentStore();
  const { logout } = useAuthStore();
  const { categories, updateCategories } = useCategoryStore();
  const navigate = useNavigate();
  
  const [currentTab, setCurrentTab] = useState<"dashboard" | "products" | "orders" | "new" | "testimonials" | "content" | "messages" | "websiteContent" | "pageContent" | "categories">("dashboard");
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [currentPage, setCurrentPage] = useState<keyof typeof pages>("about");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [orderStatusDialog, setOrderStatusDialog] = useState<{
    isOpen: boolean;
    orderId: number | null;
    status: Order['status'];
  }>({
    isOpen: false,
    orderId: null,
    status: "pending"
  });

  const [messageViewDialog, setMessageViewDialog] = useState<{
    isOpen: boolean;
    message: Message | null;
  }>({
    isOpen: false,
    message: null
  });

  const [imageUploadDialog, setImageUploadDialog] = useState<{
    isOpen: boolean;
    imageType: keyof WebsiteImages | null;
  }>({
    isOpen: false,
    imageType: null
  });

  // Count unread messages
  const unreadMessageCount = messages.filter(msg => !msg.read).length;

  // Calculate dashboard statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const completedOrders = orders.filter(order => order.status === "completed").length;
  const cancelledOrders = orders.filter(order => order.status === "cancelled").length;
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Form for adding/editing products
  const productForm = useForm<ProductFormValues>({
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

  // Form for website content
  const contentForm = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: textContent
  });

  // Form for page content
  const pageContentForm = useForm<PageContentFormValues>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      title: pages[currentPage].title,
      content: pages[currentPage].content
    }
  });

  // Handle product form submission
  const onProductSubmit = (data: ProductFormValues) => {
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
      // Add new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
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
    
    productForm.reset();
    setEditingProduct(null);
    setCurrentTab("products");
  };

  // Handle website content form submission
  const onContentSubmit = (data: ContentFormValues) => {
    updateTextContent(data);
    toast.success("Website content updated successfully!");
    // Force page reload to see changes immediately
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Handle page content submission
  const onPageContentSubmit = (data: PageContentFormValues) => {
    updatePage(currentPage, {
      title: data.title,
      content: data.content
    });
    toast.success(`${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} page updated successfully!`);
    // Force page reload to see changes immediately
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Handle page selection change
  const handlePageChange = (page: keyof typeof pages) => {
    setCurrentPage(page);
    pageContentForm.reset({
      title: pages[page].title,
      content: pages[page].content
    });
  };

  // Delete a product
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Product deleted successfully!");
  };

  // Edit a product
  const handleEditProduct = (product: typeof products[0]) => {
    setEditingProduct(product);
    productForm.reset({
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
      toast.success(`Order status updated to ${orderStatusDialog.status}!`);
      setOrderStatusDialog({ isOpen: false, orderId: null, status: "pending" });
    }
  };

  // Delete an order
  const handleDeleteOrder = (id: number) => {
    deleteOrder(id);
    toast.success("Order deleted successfully!");
  };

  // View message
  const handleViewMessage = (message: Message) => {
    // Mark as read when viewing
    if (!message.read) {
      markAsRead(message.id);
    }
    
    setMessageViewDialog({
      isOpen: true,
      message: message
    });
  };

  // Delete message
  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
    toast.success("Message deleted successfully");
  };

  // Notify about an order
  const handleNotifyOrder = (orderId: number) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      toast.success(`Notification sent to ${order.customer} at ${order.contact}!`);
    }
  };

  // Handle social links update
  const [socialLinksForm, setSocialLinksForm] = useState({
    facebook: socialLinks.facebook,
    instagram: socialLinks.instagram,
    twitter: socialLinks.twitter
  });

  const handleSocialLinksUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks(socialLinksForm);
    toast.success("Social media links updated successfully!");
  };

  // Handle image upload dialog
  const handleImageUpload = (imageType: keyof WebsiteImages) => {
    setImageFile(null);
    setImagePreview(null);
    setImageUploadDialog({
      isOpen: true,
      imageType
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process image upload
  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageFile && imageUploadDialog.imageType) {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateImage(imageUploadDialog.imageType!, base64String);
        toast.success(`${imageUploadDialog.imageType} image updated successfully!`);
        setImageUploadDialog({ isOpen: false, imageType: null });
        
        // Force page reload to see changes immediately
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      reader.readAsDataURL(imageFile);
    } else if (!imageFile && imageUploadDialog.imageType) {
      // If no file but URL is provided
      const form = e.target as HTMLFormElement;
      const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement).value;
      
      if (imageUrl) {
        updateImage(imageUploadDialog.imageType, imageUrl);
        toast.success(`${imageUploadDialog.imageType} image updated successfully!`);
        setImageUploadDialog({ isOpen: false, imageType: null });
        
        // Force page reload to see changes immediately
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Please provide an image file or URL");
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy">Super Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <p className="text-lg text-morocco-navy/70 mb-8">
            Manage your products, orders, testimonials, and website content
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 space-y-2">
              <Button 
                variant={currentTab === "dashboard" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("dashboard")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant={currentTab === "orders" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("orders")}
              >
                <Truck className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button 
                variant={currentTab === "products" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("products")}
              >
                Products
              </Button>
              <Button 
                variant={currentTab === "messages" ? "default" : "outline"}
                className="w-full justify-start flex items-center"
                onClick={() => setCurrentTab("messages")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Messages</span>
                {unreadMessageCount > 0 && (
                  <Badge variant="destructive" className="ml-2">{unreadMessageCount}</Badge>
                )}
              </Button>
              <Button 
                variant={currentTab === "testimonials" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("testimonials")}
              >
                <Users className="mr-2 h-4 w-4" />
                Testimonials
              </Button>
              <Button 
                variant={currentTab === "websiteContent" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentTab("websiteContent");
                  contentForm.reset(textContent);
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Main Content
              </Button>
              <Button 
                variant={currentTab === "categories" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("categories")}
              >
                <Image className="mr-2 h-4 w-4" />
                Collections
              </Button>
              <Button 
                variant={currentTab === "pageContent" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setCurrentTab("pageContent");
                  handlePageChange("about");
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Page Content
              </Button>
              <Button 
                variant={currentTab === "content" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setCurrentTab("content")}
              >
                Social Media
              </Button>
              <Button 
                variant={currentTab === "new" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setEditingProduct(null);
                  productForm.reset();
                  setCurrentTab("new");
                }}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </Button>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {currentTab === "dashboard" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Total Orders</div>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</div>
                            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} MAD</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Average Order Value</div>
                            <div className="text-2xl font-bold">{averageOrderValue.toFixed(2)} MAD</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Products</div>
                            <div className="text-2xl font-bold">{products.length}</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Pending</div>
                            <div className="text-2xl font-bold text-yellow-600">{pendingOrders}</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Processing</div>
                            <div className="text-2xl font-bold text-blue-600">{processingOrders}</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Completed</div>
                            <div className="text-2xl font-bold text-green-600">{completedOrders}</div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-6">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Cancelled</div>
                            <div className="text-2xl font-bold text-red-600">{cancelledOrders}</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order #</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Total</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orders.slice(0, 5).map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{order.orderNumber}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
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
                              </TableRow>
                            ))}
                            {orders.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                                  No orders yet
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                      {orders.length > 5 && (
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setCurrentTab("orders")}
                        >
                          View All Orders
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentTab === "categories" && (
                <CategoryFeatureManager 
                  categories={categories} 
                  updateCategories={updateCategories} 
                />
              )}
              
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
                            <TableHead>Order #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.length > 0 ? (
                            orders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{order.orderNumber}</TableCell>
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
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleDeleteOrder(order.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                No orders yet. When customers place orders, they will appear here.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentTab === "messages" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      {messages.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Status</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {messages.map((message) => (
                              <TableRow key={message.id} className={!message.read ? "bg-blue-50" : ""}>
                                <TableCell>
                                  {!message.read ? (
                                    <Badge variant="default" className="bg-blue-500">New</Badge>
                                  ) : (
                                    <Badge variant="outline">Read</Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{message.name}</div>
                                    <div className="text-sm text-gray-500">{message.email}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{message.subject}</TableCell>
                                <TableCell>{message.date}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleViewMessage(message)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => window.location.href = `mailto:${message.email}`}
                                    >
                                      <Mail className="h-4 w-4 mr-1" />
                                      Reply
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleDeleteMessage(message.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No messages yet. When customers send messages, they will appear here.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {currentTab === "testimonials" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Testimonials Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead>Comment</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {testimonials.map((testimonial) => (
                              <TableRow key={testimonial.id}>
                                <TableCell>{testimonial.name}</TableCell>
                                <TableCell>{testimonial.rating}</TableCell>
                                <TableCell className="max-w-xs truncate">{testimonial.text}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => {
                                        setTestimonials(testimonials.filter(t => t.id !== testimonial.id));
                                        toast.success("Testimonial deleted successfully!");
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
