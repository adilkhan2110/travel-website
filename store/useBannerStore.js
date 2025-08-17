import { create } from "zustand";
import { toast } from "react-toastify";

const useBannerStore = create((set, get) => ({
  items: [],
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,

  // Loading states
  isFetchingItems: false,
  isAddingItem: false,
  isUpdatingItem: false,
  isDeletingItem: false,

  // Pagination handlers
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

  // ✅ Fetch banners (with pagination support)
  fetchItems: async (page, rowsPerPage, all = false) => {
    set({ isFetchingItems: true });
    try {
      const response = await fetch(
        all
          ? `/api/banner?all=true`
          : `/api/banner?page=${page}&limit=${rowsPerPage}`
      );
      const data = await response.json();
 
      if (!response.ok) throw new Error(data.error || "Failed to fetch banners");

      set({
        items: data.data,
        totalCount: data.totalCount ?? data.data.length, // agar count na aaye to fallback
      });
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast("Failed to fetch banners", { type: "error" });
    } finally {
      set({ isFetchingItems: false });
    }
  },

  // ✅ Add new banner
addItem: async (formData) => {
  set({ isAddingItem: true });
  try {
    const response = await fetch("/api/banner", {
      method: "POST",
      body: formData, // already a FormData
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Failed to add banner");

    set((state) => ({
      items: [...state.items, result.data],
      totalCount: state.totalCount + 1,
    }));

    toast("Banner added successfully", { type: "success" });
  } catch (error) {
    console.error("Add banner error:", error);
    toast("Failed to add banner", { type: "error" });
  } finally {
    set({ isAddingItem: false });
  }
},


  // ✅ Update banner
 updateItem: async (id, formData) => {
  set({ isUpdatingItem: true });
  try {
    const response = await fetch(`/api/banner/${id}`, {
      method: "PUT",
      body: formData, // 👈 send as FormData
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Failed to update banner");

    await get().fetchItems(get().page, get().rowsPerPage);

    toast("Banner updated successfully", { type: "success" });
  } catch (error) {
    console.error("Update banner error:", error);
    toast("Failed to update banner", { type: "error" });
  } finally {
    set({ isUpdatingItem: false });
  }
},


  // ✅ Delete banner
  deleteItem: async (id) => {
    set({ isDeletingItem: true });
    try {
      const response = await fetch(`/api/banner/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Failed to delete banner");

      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
        totalCount: state.totalCount - 1,
      }));

      toast("Banner deleted successfully", { type: "success" });
    } catch (error) {
      console.error("Delete banner error:", error);
      toast("Failed to delete banner", { type: "error" });
    } finally {
      set({ isDeletingItem: false });
    }
  },
}));

export default useBannerStore;
