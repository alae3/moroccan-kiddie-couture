
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image, Upload } from "lucide-react";
import { toast } from "sonner";

interface CategoryImage {
  id: string;
  image: string;
  title: string;
  link: string;
}

interface CategoryFeatureManagerProps {
  categories: CategoryImage[];
  updateCategories: (categories: CategoryImage[]) => void;
}

const CategoryFeatureManager = ({ categories, updateCategories }: CategoryFeatureManagerProps) => {
  const [editingCategories, setEditingCategories] = useState<CategoryImage[]>(categories);
  
  // Handle image URL input change
  const handleImageChange = (index: number, url: string) => {
    const newCategories = [...editingCategories];
    newCategories[index].image = url;
    setEditingCategories(newCategories);
  };
  
  // Handle title input change
  const handleTitleChange = (index: number, title: string) => {
    const newCategories = [...editingCategories];
    newCategories[index].title = title;
    setEditingCategories(newCategories);
  };
  
  // Handle link input change
  const handleLinkChange = (index: number, link: string) => {
    const newCategories = [...editingCategories];
    newCategories[index].link = link;
    setEditingCategories(newCategories);
  };
  
  // Save changes to all categories
  const handleSaveChanges = () => {
    updateCategories(editingCategories);
    toast.success("Categories updated successfully!");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore Collections Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editingCategories.map((category, index) => (
            <Card key={category.id}>
              <CardContent className="p-4">
                <AspectRatio ratio={1/1} className="bg-muted mb-4">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="rounded-md object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=300&q=80"; 
                    }}
                  />
                </AspectRatio>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`image-${index}`}>Image URL</Label>
                    <Input 
                      id={`image-${index}`}
                      value={category.image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input 
                      id={`title-${index}`}
                      value={category.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`link-${index}`}>Link URL</Label>
                    <Input 
                      id={`link-${index}`}
                      value={category.link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Button 
          className="mt-6 w-full"
          onClick={handleSaveChanges}
        >
          <Upload className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryFeatureManager;
