"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField } from "../ui/hook-form";
import RHFImageUpload from "../ui/hook-form/rhf-image-upload";
import LoadingButton from "../ui/LoadingButton";
import { useEffect } from "react";
import useBannerStore from "@/store/useBannerStore";

// ✅ Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      // Allow string (existing URL) or File[]
      if (!value) return false;
      if (typeof value === "string") return true;
      if (Array.isArray(value) && value.length > 0) return true;
      return false;
    }),
});

const BannerImage = ({ formData, handleClose, isEdit, isLoading }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
    },
  });

  const { handleSubmit: onFormSubmit, reset } = methods;
  const { addItem, updateItem } = useBannerStore();

  // ✅ Populate form when editing
// ✅ Populate form when editing
useEffect(() => {
  if (isEdit && formData) {
      
    reset({
      title: formData?.title || "",
      description: formData?.description || "",
      image: formData?.image ? [formData.image] : [], // always array
    });
  }
}, [isEdit, formData, reset]);


  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("description", data.description);

      // ✅ Handle image correctly
     if (Array.isArray(data.image) && data.image[0] instanceof File) {
        formDataToSend.append("image", data.image[0]);
      }

      if (isEdit) {
        await updateItem(formData._id, formDataToSend);
      } else {
        await addItem(formDataToSend);
      }

      handleClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Box
      className="modal-content"
      sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}
    >
      <h4 className="modal-title">{isEdit ? "Update" : "Add"} Banner Image</h4>

      <FormProvider {...methods}>
        <form onSubmit={onFormSubmit(onSubmit)}>
          <Box sx={{ mb: 2 }}>
            <RHFTextField name="title" label="Title" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <RHFImageUpload
              name="image"
              label="Banner Image"
              defaultImage={isEdit ? formData?.image : null} // ✅ pass existing image for preview
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton loading={isLoading}>
              {isEdit ? "Update" : "Add"}
            </LoadingButton>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default BannerImage;
