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
import { Edit, Eye, Mail, MessageSquare, Trash2, Upload, Image, Settings, LogOut, Users, FileText, Truck } from "lucide-react";
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
  const navigate = useNavigate();
  
  const [currentTab, setCurrentTab] = useState<"products" | "orders" | "new" | "testimonials" | "content" | "messages" | "websiteContent" | "pageContent">("orders");
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
                      </div>

                      {/* Add new testimonial */}
                      <div className="border rounded-md p-4 mt-6">
                        <h3 className="text-lg font-medium mb-4">Add New Testimonial</h3>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                            const location = (form.elements.namedItem('location') as HTMLInputElement).value;
                            const rating = parseInt((form.elements.namedItem('rating') as HTMLSelectElement).value);
                            const text = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
                            const image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80";

                            if (name && location && rating && text) {
                              const newTestimonial = {
                                id: Math.max(...testimonials.map(t => t.id), 0) + 1,
                                name,
                                location,
                                image,
                                rating,
                                text
                              };
                              setTestimonials([...testimonials, newTestimonial]);
                              form.reset();
                              toast.success("Testimonial added successfully!");
                            }
                          }}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Customer Name</Label>
                              <Input id="name" name="name" required />
                            </div>
                            <div>
                              <Label htmlFor="location">Location</Label>
                              <Input id="location" name="location" placeholder="e.g. Rabat" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="rating">Rating (1-5)</Label>
                              <Select name="rating" defaultValue="5">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Poor</SelectItem>
                                  <SelectItem value="2">2 - Fair</SelectItem>
                                  <SelectItem value="3">3 - Good</SelectItem>
                                  <SelectItem value="4">4 - Very Good</SelectItem>
                                  <SelectItem value="5">5 - Excellent</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="comment">Testimonial Text</Label>
                            <Textarea id="comment" name="comment" rows={4} required />
                          </div>
                          <Button type="submit">Add Testimonial</Button>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentTab === "content" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSocialLinksUpdate} className="space-y-4">
                      <div>
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input 
                          id="facebook" 
                          value={socialLinksForm.facebook} 
                          onChange={(e) => setSocialLinksForm({...socialLinksForm, facebook: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input 
                          id="instagram" 
                          value={socialLinksForm.instagram} 
                          onChange={(e) => setSocialLinksForm({...socialLinksForm, instagram: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter URL</Label>
                        <Input 
                          id="twitter" 
                          value={socialLinksForm.twitter} 
                          onChange={(e) => setSocialLinksForm({...socialLinksForm, twitter: e.target.value})}
                        />
                      </div>
                      <Button type="submit">Update Social Links</Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {currentTab === "new" && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...productForm}>
                      <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-6">
                        <FormField
                          control={productForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={productForm.control}
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
                            control={productForm.control}
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
                          control={productForm.control}
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
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="baby">Baby</SelectItem>
                                  <SelectItem value="boys">Boys</SelectItem>
                                  <SelectItem value="girls">Girls</SelectItem>
                                  <SelectItem value="accessories">Accessories</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={productForm.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={productForm.control}
                            name="rating"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rating (1-5)</FormLabel>
                                <Select 
                                  onValueChange={(value) => field.onChange(parseInt(value))} 
                                  defaultValue={String(field.value)}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1">1 Star</SelectItem>
                                    <SelectItem value="2">2 Stars</SelectItem>
                                    <SelectItem value="3">3 Stars</SelectItem>
                                    <SelectItem value="4">4 Stars</SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={productForm.control}
                            name="isNew"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
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
                            control={productForm.control}
                            name="isSale"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
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
                        </div>
                        
                        <div className="flex gap-2">
                          <Button type="submit">
                            {editingProduct ? "Update Product" : "Add Product"}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              productForm.reset();
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

              {currentTab === "websiteContent" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Website Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="text">
                      <TabsList className="mb-4">
                        <TabsTrigger value="text">Text Content</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="text">
                        <Form {...contentForm}>
                          <form onSubmit={contentForm.handleSubmit(onContentSubmit)} className="space-y-6">
                            <div className="border-b pb-4 mb-4">
                              <h3 className="text-lg font-medium mb-2">Hero Section</h3>
                              <div className="grid gap-4">
                                <FormField
                                  control={contentForm.control}
                                  name="heroTitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Hero Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="heroSubtitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Hero Subtitle</FormLabel>
                                      <FormControl>
                                        <Textarea {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="heroButtonText"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Button Text</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <div className="border-b pb-4 mb-4">
                              <h3 className="text-lg font-medium mb-2">About Section</h3>
                              <div className="grid gap-4">
                                <FormField
                                  control={contentForm.control}
                                  name="aboutTitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>About Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="aboutDescription"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>About Description</FormLabel>
                                      <FormControl>
                                        <Textarea {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <div className="border-b pb-4 mb-4">
                              <h3 className="text-lg font-medium mb-2">Other Sections</h3>
                              <div className="grid gap-4">
                                <FormField
                                  control={contentForm.control}
                                  name="featuredTitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Featured Products Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="contactTitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Contact Section Title</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="contactSubtitle"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Contact Section Subtitle</FormLabel>
                                      <FormControl>
                                        <Textarea {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={contentForm.control}
                                  name="footerText"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Footer Text</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <Button type="submit">Save Website Content</Button>
                          </form>
                        </Form>
                      </TabsContent>
                      
                      <TabsContent value="images">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Hero Image */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">Hero Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <AspectRatio ratio={16/9} className="bg-muted">
                                  <img 
                                    src={images.heroImage} 
                                    alt="Hero" 
                                    className="rounded-md object-cover w-full h-full"
                                  />
                                </AspectRatio>
                                <Button 
                                  className="w-full" 
                                  variant="outline"
                                  onClick={() => handleImageUpload('heroImage')}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Change Hero Image
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* About Image */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">About Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <AspectRatio ratio={16/9} className="bg-muted">
                                  <img 
                                    src={images.aboutImage} 
                                    alt="About" 
                                    className="rounded-md object-cover w-full h-full"
                                  />
                                </AspectRatio>
                                <Button 
                                  className="w-full" 
                                  variant="outline"
                                  onClick={() => handleImageUpload('aboutImage')}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Change About Image
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Banner Image */}
                          <Card className="md:col-span-2">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">Banner Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <AspectRatio ratio={21/9} className="bg-muted">
                                  <img 
                                    src={images.bannerImage} 
                                    alt="Banner" 
                                    className="rounded-md object-cover w-full h-full"
                                  />
                                </AspectRatio>
                                <Button 
                                  className="w-full" 
                                  variant="outline"
                                  onClick={() => handleImageUpload('bannerImage')}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Change Banner Image
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {currentTab === "pageContent" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Page Content Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label htmlFor="page-select">Select Page</Label>
                        <Select 
                          defaultValue={currentPage}
                          onValueChange={(value) => handlePageChange(value as keyof typeof pages)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="about">About Us</SelectItem>
                            <SelectItem value="sustainability">Sustainability</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                            <SelectItem value="shipping">Shipping & Returns</SelectItem>
                            <SelectItem value="contact">Contact</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Form {...pageContentForm}>
                        <form onSubmit={pageContentForm.handleSubmit(onPageContentSubmit)} className="space-y-6">
                          <FormField
                            control={pageContentForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Page Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={pageContentForm.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Page Content</FormLabel>
                                <FormControl>
                                  <Textarea className="min-h-[200px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-gray-500">
                                  You can use HTML tags to format your content (e.g., &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, etc.)
                                </p>
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit">Save Page Content</Button>
                        </form>
                      </Form>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Order Status Dialog */}
      <Dialog open={orderStatusDialog.isOpen} onOpenChange={(open) => !open && setOrderStatusDialog(prev => ({ ...prev, isOpen: false }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Select Status</Label>
              <Select 
                value={orderStatusDialog.status} 
                onValueChange={(value) => setOrderStatusDialog(prev => ({ ...prev, status: value as Order['status'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderStatusDialog({ isOpen: false, orderId: null, status: "pending" })}>Cancel</Button>
            <Button onClick={handleUpdateOrderStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Message Dialog */}
      <Dialog open={messageViewDialog.isOpen} onOpenChange={(open) => !open && setMessageViewDialog(prev => ({ ...prev, isOpen: false }))}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message from {messageViewDialog.message?.name}</DialogTitle>
            <DialogDescription>
              Received on {messageViewDialog.message?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-medium">From:</p>
              <p>{messageViewDialog.message?.name} ({messageViewDialog.message?.email})</p>
            </div>
            <div>
              <p className="text-sm font-medium">Subject:</p>
              <p>{messageViewDialog.message?.subject}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Message:</p>
              <p className="whitespace-pre-wrap">{messageViewDialog.message?.message}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setMessageViewDialog({ isOpen: false, message: null })}
            >
              Close
            </Button>
            {messageViewDialog.message && (
              <Button 
                onClick={() => window.location.href = `mailto:${messageViewDialog.message?.email}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                Reply via Email
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Image Upload Dialog */}
      <Dialog open={imageUploadDialog.isOpen} onOpenChange={(open) => !open && setImageUploadDialog(prev => ({ ...prev, isOpen: false }))}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update {imageUploadDialog.imageType} Image</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleImageSubmit} className="space-y-4 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Select an image file to upload
                </p>
              </div>
              
              {imagePreview && (
                <div>
                  <Label>Image Preview</Label>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    </AspectRatio>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <Label htmlFor="imageUrl">Or Enter Image URL</Label>
                <Input 
                  id="imageUrl" 
                  name="imageUrl" 
                  placeholder="https://example.com/image.jpg" 
                  className="mt-1"
                  disabled={!!imageFile}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Alternatively, enter a URL for the image
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setImageUploadDialog({ isOpen: false, imageType: null })}>
                Cancel
              </Button>
              <Button type="submit">
                <Image className="mr-2 h-4 w-4" />
                Update Image
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
