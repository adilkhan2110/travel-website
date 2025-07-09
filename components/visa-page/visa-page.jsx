"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import useVisaDetail from "../../store/useVisaDetail";

import RHFImageUpload from "../../components/ui/hook-form/rhf-image-upload";
import RHFQuillEditor from "../../components/ui/hook-form/RHFQuillEditor";
import { RHFTextField } from "../../components/ui/hook-form";

// ✅ Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
  processing: yup.string().required("Description is required"),
  validity: yup.string().required("Description is required"),
  requirements: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("required", "At least one image is required", (value) => {
      return value && value.length > 0;
    }),
});

const VisaView = ({ formData, handleClose, isEdit }) => {
  const { addItem, updateItem } = useVisaDetail();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      processing: "",
      validity: "",
      requirements: "",

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

        image: formData.image ? [`http://localhost:3000${formData.image}`] : [],
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
      formDataToSend.append("description", data.description);

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
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
      }}
      className="page-content"
    >
      <h4 className="modal-title">{isEdit ? "Update" : "Add"} Visa</h4>

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

            <Box sx={{ width: "100%", mb: 4 }}>
              <RHFQuillEditor name="description" label="Description" />
            </Box>

            <RHFImageUpload name="image" label="Tour Image" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained">
              {isEdit ? "Update" : "Add"}
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default VisaView;
