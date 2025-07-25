"use client";

import { Box, Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "../ui/hook-form";
import RHFImageUpload from "../ui/hook-form/rhf-image-upload";
import RHFTagInput from "../ui/hook-form/RHFTagInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import useHolidayPackages from "../../store/useHolidayPackages";
import LoadingButton from "../../components/ui/LoadingButton";

// ✅ Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  country: yup.string().required("Country is required"),
  nights: yup
    .number()
    .typeError("Nights must be a number")
    .required("Nights are required")
    .min(1, "Nights must be at least 1"),
  days: yup
    .number()
    .typeError("Days must be a number")
    .required("Days are required")
    .test(
      "day-night-difference",
      "Days must be equal to nights or nights + 1",
      function (value) {
        const { nights } = this.parent;
        return value === nights || value === nights + 1;
      }
    ),
  includes: yup
    .array()
    .of(yup.string())
    .min(1, "At least one include item is required"),
  image: yup
    .mixed()
    .test("required", "At least one image is required", (value) => {
      return value && value.length > 0;
    }),
});

const HolidayModal = ({ formData, handleClose, isEdit }) => {
  const { addItem, updateItem, isAddingItem, isUpdatingItem } =
    useHolidayPackages();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      country: "",
      nights: "",
      days: "",
      includes: [],
      image: [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isEdit && formData) {
      reset({
        title: formData.title || "",
        price: formData.price || "",
        country: formData.country || "",
        nights: formData.nights || "",
        days: formData.days || "",
        includes: formData.includes || [],
        image: formData.image ? [`${formData.image}`] : [],
      });
    }
  }, [isEdit, formData, reset]);

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("price", data.price);
      formDataToSend.append("country", data.country);
      formDataToSend.append("nights", data.nights);
      formDataToSend.append("days", data.days);
      formDataToSend.append("includes", JSON.stringify(data.includes));

      data.image.forEach((img) => {
        if (img instanceof File) {
          formDataToSend.append("image", img);
        }
      });

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
      sx={{
        width: 800,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
      }}
      className="modal-content"
    >
      <h4 className="modal-title">{isEdit ? "Update" : "Add"} Tour</h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-grid">
            <RHFTextField className="form-item" name="title" label="Title" />

            <RHFTextField
              className="form-item"
              name="price"
              type="number"
              label="Price (INR)"
            />

            <RHFTextField
              className="form-item"
              name="country"
              label="Country"
            />

            <RHFTextField
              className="form-item"
              name="nights"
              type="number"
              label="Nights"
            />

            <RHFTextField
              className="form-item"
              name="days"
              type="number"
              label="Days"
            />
            <Box className="w-full">
              <RHFTagInput name="includes" label="Includes (comma separated)" />
            </Box>

            <RHFImageUpload name="image" label="Tour Image" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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

export default HolidayModal;
