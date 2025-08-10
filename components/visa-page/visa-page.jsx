"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField } from "../../components/ui/hook-form";
import RHFImageUpload from "../../components/ui/hook-form/rhf-image-upload";
import RHFQuillEditor from "../../components/ui/hook-form/RHFQuillEditor";
import useVisaDetail from "../../store/useVisaDetail";
import RHFTagInput from "../ui/hook-form/RHFTagInput";
import LoadingButton from "../../components/ui/LoadingButton";
// ✅ Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  priceINR: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  processing: yup
    .number()
    .typeError("Processing must be a number")
    .required("Processing is required"),
  validity: yup
    .number()
    .typeError("Validity must be a number")
    .required("Validity is required"),
  days: yup
    .number()
    .typeError("Days must be a number")
    .required("Days is required"),
  requirements: yup
    .array()
    .of(yup.string())
    .min(1, "At least one requirement is required"),
  image: yup
    .mixed()
    .test("required", "At least one image is required", (value) => {
      return value && value.length > 0;
    }),
});

const VisaView = () => {
  const { id } = useParams();

  const router = useRouter();
  const {
    addItem,
    updateItem,
    getItemById,
    selectedItem,
    isUpdatingItem,
    isAddingItem,
  } = useVisaDetail();

  useEffect(() => {
    if (id) {
      getItemById(id);
    }
  }, [id]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      priceINR: "",
      description: "",
      processing: "",
      validity: "",
      days: "",
      requirements: [],
      image: [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (selectedItem) {
      reset({
        title: selectedItem?.title || "",
        priceINR: selectedItem?.priceINR || "",
        description: selectedItem?.description || "",
        processing: selectedItem?.processing || "",
        validity: selectedItem?.validity || "",
        days: selectedItem?.days || "",
        requirements: selectedItem?.requirements || [],
        image: selectedItem?.image ? [`${selectedItem?.image}`] : [],
      });
    }
  }, [selectedItem, reset]);

  const onSubmit = async (data) => {
    debugger
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("priceINR", data.priceINR);
      formDataToSend.append("description", data.description);
      formDataToSend.append("processing", data.processing);
      formDataToSend.append("validity", data.validity);
      formDataToSend.append("days", data.days);
      formDataToSend.append("requirements", JSON.stringify(data.requirements));

      data.image.forEach((img) => {
        if (img instanceof File) {
          formDataToSend.append("image", img);
        }
      });

      if (selectedItem?._id) {
        await updateItem(selectedItem._id, formDataToSend);
      } else {
        await addItem(formDataToSend);
      }

      redirectPage();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const redirectPage = () => {
    router.push("/visa-update");
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
      <h4 className="modal-title">
        {selectedItem?._id ? "Update" : "Add"} Visa
      </h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-grid">
            <RHFTextField className="form-item" name="title" label="Title" />
            <RHFTextField
              className="form-item"
              name="priceINR"
              type="number"
              label="Price (INR)"
            />
            <RHFTextField
              className="form-item"
              name="validity"
              type="number"
              label="Validity (days)"
            />
            <RHFTextField
              className="form-item"
              name="processing"
              type="number"
              label="Processing Time (days)"
            />
            <RHFTextField
              className="form-item"
              name="days"
              type="number"
              label="Tour Duration (days)"
            />
            <Box sx={{ width: { xs: "100%", sm: "48%" }, mb: 4 }}>
              <RHFTagInput
                name="requirements"
                label="Requirements (comma separated)"
              />
            </Box>
            <Box sx={{ width: "100%", mb: 4 }}>
              <RHFQuillEditor name="description" label="Description" />
            </Box>
            <RHFImageUpload name="image" label="Tour Image" />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <LoadingButton loading={isAddingItem || isUpdatingItem}>
              {selectedItem ? "Update" : "Add"}
            </LoadingButton>

            <Button variant="outlined" sx={{ ml: 2 }} onClick={redirectPage}>
              Cancel
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default VisaView;
