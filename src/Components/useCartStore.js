import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  likedItems: [], // Հավանած ապրանքների զանգված
  
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),

  // Սրտիկին սեղմելիս ապրանքը ավելանում կամ հեռանում է հավանածների ցանկից
  toggleLike: (item) => set((state) => {
    const exists = state.likedItems.some((p) => p.id === item.id || p.text === item.text);
    if (exists) {
      return { likedItems: state.likedItems.filter((p) => p.id !== item.id && p.text !== item.text) };
    } else {
      return { likedItems: [...state.likedItems, item] };
    }
  }),
}));