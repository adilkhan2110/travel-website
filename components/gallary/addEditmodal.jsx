"use client";

import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSelect, RHFTextField } from "../../components/ui/hook-form";
import RHFImageUpload from "../../components/ui/hook-form/rhf-image-upload";
import MenuItem from "@mui/material/MenuItem";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect } from "react";
import useGalleryStore from "@/store/useGalleryStore ";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  image: yup
    .mixed()
    .test("required", "At least one image is required", (value) => {
      return value && value.length > 0;
    }),
});

const AddEditModal = ({ formData, handleClose, isEdit }) => {
  const { addItem, updateItem } = useGalleryStore();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      category: "",
      image: [],
    },
  });

  const {
    handleSubmit,
    reset,
    // formState: { isSubmitting },
  } = methods;

  const options = [
    { value: "Mountain", label: "Mountain" },
    { value: "City", label: "City" },
    { value: "Lake", label: "Lake" },
    { value: "River", label: "River" },
    { value: "Forest", label: "Forest" },
    { value: "Desert", label: "Desert" },
    { value: "Beach", label: "Beach" },
    { value: "Valley", label: "Valley" },
    { value: "Other", label: "Other" },
  ];

  // Populate form when editing
  useEffect(() => {
    if (isEdit && formData) {
      reset({
        title: formData?.title || "",
        category: formData?.category || "",
        image: formData?.image
          ? [`http://localhost:3000${formData.image}`]
          : [],
      });
    }
  }, [isEdit, formData, reset]);

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("category", data.category);

      for (let i = 0; i < data.image.length; i++) {
        if (data.image[i] instanceof File) {
          formDataToSend.append("image", data.image[i]);
        }
      }

      if (isEdit) {
        await updateItem(formData._id, formDataToSend);
      } else {
        await addItem(formDataToSend);
      }

      handleClose(); // Close modal after submit
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Box
      sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 2 }}>
            <RHFTextField name="title" label="Title" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <RHFSelect name="category" label="Category">
              {options.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
          <Box sx={{ mb: 2 }}>
            <RHFImageUpload name="image" label="Gallry Image" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              // disabled={isSubmitting}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 2, ml: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddEditModal;
