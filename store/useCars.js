import { create } from "zustand";
import { toast } from "react-toastify";

const useCars = create((set, get) => ({
  items: [],
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,

  // Loading flags
  isFetchingItems: false,
  isAddingItem: false,
  isUpdatingItem: false,
  isDeletingItem: false,

  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

  // ✅ Fetch Cars (with pagination)
  fetchItems: async (page, rowsPerPage, all = false) => {
    set({ isFetchingItems: true });
    try {
      const response = await fetch(
        all
          ? `/api/cars?all=true`
          : `/api/cars?page=${page}&limit=${rowsPerPage}`
      );

      const data = await response.json();
      set({
        items: data.data,
        totalCount: data.totalCount,
      });
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast("Failed to fetch cars", { type: "error" });
    } finally {
      set({ isFetchingItems: false });
    }
  },

  // ✅ Add Car
  addItem: async (formData) => {
    set({ isAddingItem: true });
    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add car");

      const result = await response.json();
      set((state) => ({
        items: [...state.items, result.data],
        totalCount: state.totalCount + 1,
      }));

      toast("Car added successfully", { type: "success" });
    } catch (error) {
      console.error("Add car error:", error);
      toast("Failed to add car", { type: "error" });
    } finally {
      set({ isAddingItem: false });
    }
  },

  // ✅ Update Car
  updateItem: async (id, formData) => {
    set({ isUpdatingItem: true });
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update car");

      await get().fetchItems(get().page, get().rowsPerPage);

      toast("Car updated successfully", { type: "success" });
    } catch (error) {
      console.error("Update car error:", error);
      toast("Failed to update car", { type: "error" });
    } finally {
      set({ isUpdatingItem: false });
    }
  },

  // ✅ Delete Car
  deleteItem: async (id) => {
    set({ isDeletingItem: true });
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete car");

      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
        totalCount: state.totalCount - 1,
      }));

      toast("Car deleted successfully", { type: "success" });
    } catch (error) {
      console.error("Delete car error:", error);
      toast("Failed to delete car", { type: "error" });
    } finally {
      set({ isDeletingItem: false });
    }
  },
}));

export default useCars;
