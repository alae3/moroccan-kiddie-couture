
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: string[];
  contact: string;
}

interface OrderStore {
  orders: Order[];
  latestOrderNumber: number;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber'>) => Order;
  updateOrderStatus: (id: number, status: Order['status']) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

// Sample orders
const initialOrders: Order[] = [
  { 
    id: 1, 
    orderNumber: "NK-10001",
    customer: "Ahmed Benali", 
    date: "2025-05-07", 
    total: 398, 
    status: "pending",
    items: ["Moroccan Print Dress", "Boys Summer T-shirt"],
    contact: "+212 622 345678"
  },
  { 
    id: 2, 
    orderNumber: "NK-10002",
    customer: "Yasmine Alaoui", 
    date: "2025-05-06", 
    total: 189, 
    status: "completed",
    items: ["Cotton Jumpsuit"],
    contact: "yasmine@example.com"
  },
  { 
    id: 3, 
    orderNumber: "NK-10003",
    customer: "Karim Idrissi", 
    date: "2025-05-05", 
    total: 578, 
    status: "processing",
    items: ["Traditional Kaftan", "Winter Coat with Hood"],
    contact: "+212 677 123456"
  }
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: initialOrders,
      latestOrderNumber: 10003, // Start from our last sample order number
      setOrders: (orders) => set({ orders }),
      addOrder: (orderData) => {
        const newOrderNumber = get().latestOrderNumber + 1;
        const formattedOrderNumber = `NK-${newOrderNumber}`;
        
        const newOrder = {
          id: Math.max(0, ...get().orders.map(o => o.id)) + 1,
          orderNumber: formattedOrderNumber,
          ...orderData
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
          latestOrderNumber: newOrderNumber
        }));
        
        return newOrder;
      },
      updateOrderStatus: (id, status) => 
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status } : order
          )
        })),
      getOrderByNumber: (orderNumber) => get().orders.find(order => order.orderNumber === orderNumber)
    }),
    {
      name: 'order-storage', // unique name for the localStorage key
    }
  )
);
