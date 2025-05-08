
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Trash, Edit } from 'lucide-react';
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[];
  onTestimonialsChange?: (testimonials: Testimonial[]) => void;
}

const TestimonialsManager = ({ 
  initialTestimonials, 
  onTestimonialsChange 
}: TestimonialsManagerProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const resetForm = () => {
    setName("");
    setLocation("");
    setImage("");
    setRating(5);
    setText("");
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setName(testimonial.name);
      setLocation(testimonial.location);
      setImage(testimonial.image);
      setRating(testimonial.rating);
      setText(testimonial.text);
    } else {
      setEditingTestimonial(null);
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
    setEditingTestimonial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !location || !image || !text) {
      toast.error("Please fill out all fields");
      return;
    }

    let updatedTestimonials: Testimonial[];
    
    if (editingTestimonial) {
      // Update existing testimonial
      updatedTestimonials = testimonials.map(t => 
        t.id === editingTestimonial.id 
          ? { ...t, name, location, image, rating, text } 
          : t
      );
      toast.success("Testimonial updated successfully");
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        id: Math.max(0, ...testimonials.map(t => t.id)) + 1,
        name,
        location,
        image,
        rating,
        text
      };
      updatedTestimonials = [...testimonials, newTestimonial];
      toast.success("Testimonial added successfully");
    }
    
    setTestimonials(updatedTestimonials);
    if (onTestimonialsChange) {
      onTestimonialsChange(updatedTestimonials);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    if (onTestimonialsChange) {
      onTestimonialsChange(updatedTestimonials);
    }
    toast.success("Testimonial deleted successfully");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Testimonial Management</CardTitle>
        <Button onClick={() => handleOpenDialog()}>Add New Testimonial</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Text</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.location}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? 'fill-morocco-yellow text-morocco-yellow' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.text}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenDialog(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="City"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input 
                  id="rating" 
                  type="number" 
                  min="1" 
                  max="5" 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea 
                  id="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                  placeholder="What the customer said about your products..."
                  className="min-h-[100px]"
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TestimonialsManager;
