
import { create } from 'zustand';

export interface Order {
  id: number;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: string[];
  contact: string;
}

interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  updateOrderStatus: (id: number, status: Order['status']) => void;
}

// Sample orders
const initialOrders: Order[] = [
  { 
    id: 1, 
    customer: "Ahmed Benali", 
    date: "2025-05-07", 
    total: 398, 
    status: "pending",
    items: ["Moroccan Print Dress", "Boys Summer T-shirt"],
    contact: "+212 622 345678"
  },
  { 
    id: 2, 
    customer: "Yasmine Alaoui", 
    date: "2025-05-06", 
    total: 189, 
    status: "completed",
    items: ["Cotton Jumpsuit"],
    contact: "yasmine@example.com"
  },
  { 
    id: 3, 
    customer: "Karim Idrissi", 
    date: "2025-05-05", 
    total: 578, 
    status: "processing",
    items: ["Traditional Kaftan", "Winter Coat with Hood"],
    contact: "+212 677 123456"
  }
];

export const useOrderStore = create<OrderStore>((set) => ({
  orders: initialOrders,
  setOrders: (orders) => set({ orders }),
  updateOrderStatus: (id, status) => 
    set((state) => ({
      orders: state.orders.map(order => 
        order.id === id ? { ...order, status } : order
      )
    })),
}));
