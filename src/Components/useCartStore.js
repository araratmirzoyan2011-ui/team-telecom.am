import { create } from 'zustand';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const useCartStore = create((set, get) => ({
  cart: [],
  likedItems: [],
  isLoaded: false, 
  
  loadUserData: async () => {
    const user = auth.currentUser;
    if (!user) {
      set({ isLoaded: true });
      return;
    }
    
    try {
      const docRef = doc(db, "wishlists", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ likedItems: docSnap.data().items || [], isLoaded: true });
      } else {
        set({ likedItems: [], isLoaded: true });
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
      set({ isLoaded: true });
    }
  },

  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item] 
  })),

  toggleLike: async (item) => {
    const state = get();
    const user = auth.currentUser;

    const exists = state.likedItems.some((p) => p.text === item.text);
    let updatedLikes;

    if (exists) {
      updatedLikes = state.likedItems.filter((p) => p.text !== item.text);
    } else {
      updatedLikes = [...state.likedItems, item];
    }

    set({ likedItems: updatedLikes });

    if (user) {
      try {
        const docRef = doc(db, "wishlists", user.uid);
        await setDoc(docRef, { items: updatedLikes });
      } catch (error) {
        console.error("Error saving wishlist:", error);
      }
    }
  },
}));