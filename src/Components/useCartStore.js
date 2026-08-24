import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  likes: {}, // Պահպանում ենք յուրաքանչյուր ապրանքի like լինելը ID-ով կամ ինդեքսով
  
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),

  toggleLike: (id) => set((state) => ({
    likes: { ...state.likes, [id]: !state.likes[id] }
  })),
}));