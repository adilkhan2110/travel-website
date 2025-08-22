"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import useJaipurSightseeing from "../../store/useJaipurSightseeing";
import { RHFTextField } from "../ui/hook-form";
import RHFImageUpload from "../ui/hook-form/rhf-image-upload";
import RHFQuillEditor from "../ui/hook-form/RHFQuillEditor";
import LoadingButton from "../ui/LoadingButton";
// ✅ Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
 
  description: yup.string().required("Description is required"),
 
  image: yup
    .mixed()
    .test("required", "At least one image is required", (value) => {
      return value && value.length > 0;
    }),
});

const JaipurSightseeing = () => {
  const { id } = useParams();

  const router = useRouter();
  const {
    addItem,
    updateItem,
    getItemById,
    selectedItem,
    isUpdatingItem,
    isAddingItem,
  } = useJaipurSightseeing();

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
       
        description: selectedItem?.description || "",
        
        image: selectedItem?.image ? [`${selectedItem?.image}`] : [],
      });
    }
  }, [selectedItem, reset]);

  const onSubmit = async (data) => {
     
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
     
      formDataToSend.append("description", data.description);
    

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
    router.push("/jaipur-sightseeing");
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
        {selectedItem?._id ? "Update" : "Add"} Sightseeing 
      </h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-grid">
            <RHFTextField className="form-item" name="title" label="Title" />
             
           
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

export default JaipurSightseeing;
