
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessageStore {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
}

// Start with empty messages
const initialMessages: Message[] = [];

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: initialMessages,
      addMessage: (messageData) => {
        const newMessage = {
          id: Math.max(0, ...get().messages.map(m => m.id), 0) + 1,
          date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
          read: false,
          ...messageData
        };
        
        set((state) => ({
          messages: [newMessage, ...state.messages]
        }));
      },
      markAsRead: (id) =>
        set((state) => ({
          messages: state.messages.map(message =>
            message.id === id ? { ...message, read: true } : message
          )
        })),
      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter(message => message.id !== id)
        }))
    }),
    {
      name: 'message-storage', // unique name for the localStorage key
    }
  )
);
