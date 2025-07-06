// store/useGalleryStore.js
import { create } from "zustand";

const useGalleryStore = create((set, get) => ({
  items: [],
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,

  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

  fetchItems: async (page, rowsPerPage) => {
    try {
      const response = await fetch(`/api/gallery?page=${page}&limit=${rowsPerPage}`);
      const data = await response.json();
      set({
        items: data.data,
        totalCount: data.totalCount,
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  },

  addItem: async (formData) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add item");

      const result = await response.json();
      set((state) => ({
        items: [...state.items, result.data],
        totalCount: state.totalCount + 1,
      }));
    } catch (error) {
      console.error("Add item error:", error);
    }
  },

  updateItem: async (id, formData) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update item");

      const result = await response.json();
      set((state) => ({
        items: state.items.map((item) => (item._id === id ? result.data : item)),
      }));
    } catch (error) {
      console.error("Update item error:", error);
    }
  },

  deleteItem: async (id) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");

      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
        totalCount: state.totalCount - 1,
      }));
    } catch (error) {
      console.error("Delete item error:", error);
    }
  },
}));

export default useGalleryStore;
