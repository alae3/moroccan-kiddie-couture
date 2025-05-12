
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type for website text content
export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  aboutTitle: string;
  aboutDescription: string;
  featuredTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  footerText: string;
}

// Type for image content
export interface WebsiteImages {
  heroImage: string;
  aboutImage: string;
  bannerImage: string;
}

interface ContentStore {
  textContent: WebsiteContent;
  images: WebsiteImages;
  updateTextContent: (content: Partial<WebsiteContent>) => void;
  updateImage: (key: keyof WebsiteImages, url: string) => void;
}

// Default website content
const defaultTextContent: WebsiteContent = {
  heroTitle: "Contemporary Moroccan-Inspired Children's Clothing",
  heroSubtitle: "Combining traditional craftsmanship with modern design, our collections feature vibrant colors and patterns that celebrate Moroccan heritage.",
  heroButtonText: "Shop Collection",
  aboutTitle: "Our Story",
  aboutDescription: "Founded in Marrakech, NajihKids blends Moroccan artisanal techniques with contemporary designs, creating unique children's clothing that celebrates heritage while embracing modern style.",
  featuredTitle: "Featured Products",
  contactTitle: "Get in Touch",
  contactSubtitle: "Have questions about our products? Contact us directly or use the form below.",
  footerText: "© 2025 NajihKids. All rights reserved.",
};

// Default website images
const defaultImages: WebsiteImages = {
  heroImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
  aboutImage: "https://images.unsplash.com/photo-1596966539250-d2217486ff0e?auto=format&fit=crop&w=800&q=80",
  bannerImage: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1600&q=80"
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      textContent: defaultTextContent,
      images: defaultImages,
      updateTextContent: (content) => {
        set((state) => ({
          textContent: { ...state.textContent, ...content }
        }));
      },
      updateImage: (key, url) => {
        set((state) => ({
          images: { ...state.images, [key]: url }
        }));
      }
    }),
    {
      name: 'content-storage', // unique name for the localStorage key
    }
  )
);
