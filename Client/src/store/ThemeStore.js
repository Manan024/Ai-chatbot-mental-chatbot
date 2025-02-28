import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "retro",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("chat-theme", theme);
  },
}));

export default useThemeStore;
