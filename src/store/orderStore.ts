
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
  deleteOrder: (id: number) => void;
}

// Initial orders - these will be replaced with user-entered data
const initialOrders: Order[] = [];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: initialOrders,
      latestOrderNumber: 10000, // Start order numbers from 10000
      setOrders: (orders) => set({ orders }),
      addOrder: (orderData) => {
        const newOrderNumber = get().latestOrderNumber + 1;
        const formattedOrderNumber = `NK-${newOrderNumber}`;
        
        const newOrder = {
          id: Math.max(0, ...get().orders.map(o => o.id), 0) + 1,
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
      getOrderByNumber: (orderNumber) => get().orders.find(order => order.orderNumber === orderNumber),
      deleteOrder: (id) => 
        set((state) => ({
          orders: state.orders.filter(order => order.id !== id)
        }))
    }),
    {
      name: 'order-storage', // unique name for the localStorage key
    }
  )
);
