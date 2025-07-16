"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFSelect, RHFTextField } from "../../components/ui/hook-form";
import RHFImageUpload from "../../components/ui/hook-form/rhf-image-upload";
import LoadingButton from "../../components/ui/LoadingButton";

import useGalleryStore from "@/store/useGalleryStore ";
import { useEffect } from "react";

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
  const { addItem, updateItem, isAddingItem, isUpdatingItem } =
    useGalleryStore();

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
      className="modal-content"
      sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}
    >
      <h4 className="modal-title">
        {" "}
        {isEdit ? "Update" : "Add"} Gallary Iamge
      </h4>

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
            <LoadingButton loading={isAddingItem || isUpdatingItem}>
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

export default AddEditModal;
