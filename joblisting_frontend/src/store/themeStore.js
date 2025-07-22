import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light", // Initial state
      isSidebarOpen: true,

      changeTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage), // ✅ Updated way
    }
  )
);

export default useThemeStore;
