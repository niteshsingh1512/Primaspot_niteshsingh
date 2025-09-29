import { create } from "zustand";

const useStore = create((set) => ({
  instaId: "",
  setInstaId: (instaId) => set({ instaId }), // ✅ updates the state
}));

export default useStore;
