import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find(item => item.id === product.id);
        if (existing) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      get totalPrice() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    { name: 'mahalaxmi-cart' }
  )
);

export const useAdminStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      orders: [
        { id: 'ORD001', customer: 'Priya Deshmukh', amount: 4500, status: 'delivered', date: '2024-01-10', items: 1 },
        { id: 'ORD002', customer: 'Sunita Patil', amount: 8500, status: 'processing', date: '2024-01-12', items: 2 },
        { id: 'ORD003', customer: 'Meena Joshi', amount: 3200, status: 'pending', date: '2024-01-13', items: 1 },
        { id: 'ORD004', customer: 'Anjali Sharma', amount: 6700, status: 'shipped', date: '2024-01-14', items: 3 },
        { id: 'ORD005', customer: 'Rekha Kulkarni', amount: 2500, status: 'delivered', date: '2024-01-15', items: 1 },
      ],
      
      login: (password) => {
        if (password === 'admin123') {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isLoggedIn: false }),
      
      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map(o => o.id === id ? { ...o, status } : o)
        });
      },
    }),
    { name: 'mahalaxmi-admin' }
  )
);
