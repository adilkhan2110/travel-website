import { create } from "zustand";
// import { toast } from "react-toastify";
// import httpClient from "@/utils/http-client";

const useImageDelete = create((set) => ({
  uploadLoading: false,
  uploadError: null,
  uploadSuccessData: null,

  // ✅ Upload Web Page Data
  uploadWebPageData: async (formData) => {
    // try {
    //   set({
    //     uploadLoading: true,
    //     uploadError: null,
    //     uploadSuccessData: null,
    //   });

    //   const token = JSON.parse(
    //     localStorage.getItem("CURRENT_USER_ROLE_SESSION")
    //   )?.token;

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };

    //   const { data } = await httpClient.post("/webpage", formData, config);

    //   toast.success("Web page data uploaded successfully!");

    //   set({
    //     uploadLoading: false,
    //     uploadSuccessData: data,
    //   });

    //   return data;
    // } catch (error) {
    //   const errorMessage =
    //     error?.response?.data?.message || "Failed to upload web page data";
    //   toast.error(errorMessage);

    //   set({
    //     uploadLoading: false,
    //     uploadError: errorMessage,
    //   });

    //   return { error: errorMessage };
    // }
  },

  // 🧨 NEW FUNCTION: Delete Image from Uploads folder
  deleteImageFromServer: async (filename) => {
    // try {
    //   const token = JSON.parse(
    //     localStorage.getItem("CURRENT_USER_ROLE_SESSION")
    //   )?.token;

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };

    //   const { data } = await httpClient.delete(`/image/${filename}`, config);

    //   toast.success("Image deleted successfully!");
    //   return data;
    // } catch (error) {
    //   const errorMessage =
    //     error?.response?.data?.message || "Failed to delete image";
    //   toast.error(errorMessage);
    //   return { error: errorMessage };
    // }
  },
}));

export default useImageDelete;
