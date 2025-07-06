import { create } from "zustand";

const useGalleryStore = create((set, get) => ({
  items: [],
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,

  // Loading keys
  isFetchingItems: false,
  isAddingItem: false,
  isUpdatingItem: false,
  isDeletingItem: false,

  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

  fetchItems: async (page, rowsPerPage, all = false) => {

     
    set({ isFetchingItems: true });
    try {
      const response = await fetch(all ?
        `/api/gallery?all=true` :
        `/api/gallery?page=${page}&limit=${rowsPerPage}`
      );
      const data = await response.json();
      set({
        items: data.data,
        totalCount: data.totalCount,
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      set({ isFetchingItems: false });
    }
  },

  addItem: async (formData) => {
    set({ isAddingItem: true });
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

      toast({
        title: "Success!",
        description: "Your form was submitted successfully.",
      });
    } catch (error) {
      console.error("Add item error:", error);
    } finally {
      set({ isAddingItem: false });
    }
  },

  updateItem: async (id, formData) => {
    set({ isUpdatingItem: true });
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update item");

      await get().fetchItems(get().page, get().rowsPerPage);
    } catch (error) {
      console.error("Update item error:", error);
    } finally {
      set({ isUpdatingItem: false });
    }
  },

  deleteItem: async (id) => {
    set({ isDeletingItem: true });
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
    } finally {
      set({ isDeletingItem: false });
    }
  },
}));

export default useGalleryStore;
