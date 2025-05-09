
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // If item already in cart, increase quantity
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          } else {
            // Add new item with quantity 1
            return { 
              items: [...state.items, { ...product, quantity: 1 }] 
            };
          }
        });
      },
      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      updateQuantity: (productId: number, quantity: number) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === productId 
              ? { ...item, quantity: Math.max(1, quantity) } 
              : item
          )
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
