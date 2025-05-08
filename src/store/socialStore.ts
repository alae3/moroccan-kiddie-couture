
import { create } from 'zustand';

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface SocialStore {
  socialLinks: SocialLinks;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
}

export const useSocialStore = create<SocialStore>((set) => ({
  socialLinks: {
    facebook: 'https://facebook.com/petitmaroc',
    instagram: 'https://instagram.com/petitmaroc',
    twitter: 'https://twitter.com/petitmaroc',
  },
  updateSocialLinks: (links) => set((state) => ({
    socialLinks: { ...state.socialLinks, ...links }
  })),
}));
