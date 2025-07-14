// import { create } from "zustand";
// import { toast } from "react-toastify";
// const useVisaDetail = create((set, get) => ({
//   items: [],
//   totalCount: 0,
//   page: 0,
//   rowsPerPage: 10,

//   // Loading keys
//   isFetchingItems: false,
//   isAddingItem: false,
//   isUpdatingItem: false,
//   isDeletingItem: false,

//   setPage: (page) => set({ page }),
//   setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

//   fetchItems: async (page, rowsPerPage, all = false) => {
//     set({ isFetchingItems: true });
//     try {
//       const response = await fetch(
//         all
//           ? `/api/visa?all=true`
//           : `/api/visa?page=${page}&limit=${rowsPerPage}`
//       );
//       const data = await response.json();
//       set({
//         items: data.data,
//         totalCount: data.totalCount,
//       });
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     } finally {
//       set({ isFetchingItems: false });
//     }
//   },

//   addItem: async (formData) => {
//     set({ isAddingItem: true });
//     try {
//       const response = await fetch("/api/visa", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Failed to add item");

//       const result = await response.json();
//       // set((state) => ({
//       //   items: [...state.items, result.data],
//       //   totalCount: state.totalCount + 1,
//       // }));

//       toast("Image added successfully", {
//         type: "success",
//       });
//       const { page, rowsPerPage, fetchItems } = get();
//       await fetchItems(page, rowsPerPage);
//     } catch (error) {
//       console.error("Add item error:", error);
//     } finally {
//       set({ isAddingItem: false });
//     }
//   },

//   updateItem: async (id, formData) => {
//     set({ isUpdatingItem: true });
//     try {
//       const response = await fetch(`/api/visa/${id}`, {
//         method: "PUT",
//         body: formData,
//       });
//       if (!response.ok) throw new Error("Failed to update item");

//       await get().fetchItems(get().page, get().rowsPerPage);
//       toast("Image updated successfully", {
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Update item error:", error);
//     } finally {
//       set({ isUpdatingItem: false });
//     }
//   },

//   deleteItem: async (id) => {
//     set({ isDeletingItem: true });
//     try {
//       const response = await fetch(`/api/visa/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete item");

//       set((state) => ({
//         items: state.items.filter((item) => item._id !== id),
//         totalCount: state.totalCount - 1,
//       }));
//       toast("Image Deleted successfully", {
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Delete item error:", error);
//     } finally {
//       set({ isDeletingItem: false });
//     }
//   },
// }));

// export default useVisaDetail;
import { create } from "zustand";
import { toast } from "react-toastify";

const useVisaDetail = create((set, get) => ({
  items: [],
  totalCount: 0,
  page: 0,
  rowsPerPage: 10,

  // Loading states
  isFetchingItems: false,
  isFetchingItemById: false,
  isAddingItem: false,
  isUpdatingItem: false,
  isDeletingItem: false,

  // Selected item state for get-by-id
  selectedItem: null,

  // Pagination setters
  setPage: (page) => set({ page }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),

  // Fetch all or paginated items
  fetchItems: async (page, rowsPerPage, all = false) => {
    set({ isFetchingItems: true });
    try {
      const response = await fetch(
        all
          ? `/api/visa?all=true`
          : `/api/visa?page=${page}&limit=${rowsPerPage}`
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

  // Get single item by ID
  getItemById: async (id) => {
    set({ isFetchingItemById: true });
    try {
      const response = await fetch(`/api/visa/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item by ID");

      const result = await response.json();
      set({ selectedItem: result.data });

      return result.data;
    } catch (error) {
      console.error("Get item by ID error:", error);
      toast("Failed to fetch item", { type: "error" });
      return null;
    } finally {
      set({ isFetchingItemById: false });
    }
  },

  // Add new item
  addItem: async (formData) => {
    set({ isAddingItem: true });
    try {
      const response = await fetch("/api/visa", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add item");

      const result = await response.json();
      toast("Image added successfully", { type: "success" });

      const { page, rowsPerPage, fetchItems } = get();
      await fetchItems(page, rowsPerPage);
    } catch (error) {
      console.error("Add item error:", error);
    } finally {
      set({ isAddingItem: false });
    }
  },

  // Update item
  updateItem: async (id, formData) => {
    set({ isUpdatingItem: true });
    try {
      const response = await fetch(`/api/visa/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update item");

      await get().fetchItems(get().page, get().rowsPerPage);
      toast("Image updated successfully", { type: "success" });
    } catch (error) {
      console.error("Update item error:", error);
    } finally {
      set({ isUpdatingItem: false });
    }
  },

  // Delete item
  deleteItem: async (id) => {
    set({ isDeletingItem: true });
    try {
      const response = await fetch(`/api/visa/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");

      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
        totalCount: state.totalCount - 1,
      }));
      toast("Image deleted successfully", { type: "success" });
    } catch (error) {
      console.error("Delete item error:", error);
    } finally {
      set({ isDeletingItem: false });
    }
  },
}));

export default useVisaDetail;
