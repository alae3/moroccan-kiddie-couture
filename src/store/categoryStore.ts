
import { create } from 'zustand';

interface CategoryImage {
  id: string;
  image: string;
  title: string;
  link: string;
}

interface CategoryStore {
  categories: CategoryImage[];
  updateCategories: (categories: CategoryImage[]) => void;
}

// Default categories
const defaultCategories: CategoryImage[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80",
    title: "Girls",
    link: "/girls"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?auto=format&fit=crop&w=300&q=80",
    title: "Boys",
    link: "/boys"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=300&q=80",
    title: "Baby",
    link: "/baby"
  }
];

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: defaultCategories,
  updateCategories: (categories) => {
    set({ categories });
  }
}));
