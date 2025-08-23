"use client";

import { Modal, Box, Button, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RHFTextField } from "../ui/hook-form";
import RHFImageUpload from "../ui/hook-form/rhf-image-upload";
import LoadingButton from "../ui/LoadingButton";
import React from "react";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Car name is required"),
  type: yup.string().required("Car type is required"),
  adults: yup
    .number()
    .typeError("Adults must be a number")
    .required("Adults is required"),
  driver: yup.number().required("Driver is required"),
  fuel_type: yup.string().required("Fuel type is required"),
  luggage_space: yup.string().required("Luggage space is required"),
  price_per_km: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value) => value && value.length > 0
    ),
});

export default function CarModalView({
  open,
  handleClose,
  onSubmitForm,
  defaultValues,
  isLoading,
  isEdit,
}) {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      name: "",
      type: "",
      adults: "",
      driver: 1, // 🟢 default always 1
      fuel_type: "",
      luggage_space: "",
      price_per_km: "",
      image: [],
    },
  });

  const { handleSubmit, reset } = methods;

  // 🟢 Reset values when modal opens with defaultValues
  React.useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        type: defaultValues.type || "",
        adults: defaultValues.adults || "",
        driver: 1, // 🟢 always set to 1
        fuel_type: defaultValues.fuel_type || "",
        luggage_space: defaultValues.luggage_space || "",
        price_per_km: defaultValues.price_per_km || "",
        image: defaultValues.image ? [defaultValues.image] : [],
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("adults", data.adults);
    formData.append("driver", 1); // 🟢 always 1
    formData.append("fuel_type", data.fuel_type);
    formData.append("luggage_space", data.luggage_space);
    formData.append("price_per_km", data.price_per_km);

    data.image.forEach((img) => {
      if (img instanceof File) formData.append("image", img);
    });

    await onSubmitForm(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal-main">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "5%",
        }}
      >
        {/* 🟢 Wider modal for 2-column layout */}
        <Box className="modal-box p-6 bg-white rounded-lg shadow-lg w-[700px]">
          <h4 className="text-lg font-semibold mb-4">
            {isEdit ? "Update Car" : "Add New Car"}
          </h4>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField name="name" label="Car Name" fullWidth />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField
                    name="type"
                    label="Type (Sedan, SUV)"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField
                    name="adults"
                    type="number"
                    label="Adults"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField
                    name="driver"
                    type="number"
                    label="Driver"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField name="fuel_type" label="Fuel Type" fullWidth />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField
                    name="luggage_space"
                    label="Luggage Space"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <RHFTextField
                    name="price_per_km"
                    type="number"
                    label="Price per KM"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <RHFImageUpload name="image" label="Car Image" />
                </Grid>
              </Grid>

              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton loading={isLoading}>
                  {isEdit ? "Update" : "Add"}
                </LoadingButton>
              </div>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Modal>
  );
}
