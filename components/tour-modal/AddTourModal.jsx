// "use client";

// import { Box, Button } from "@mui/material";
// import { FormProvider, useForm } from "react-hook-form";
// import { RHFSelect, RHFTextField } from "../ui/hook-form";
// import RHFImageUpload from "../ui/hook-form/rhf-image-upload";
// import MenuItem from "@mui/material/MenuItem";

// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// import { useEffect } from "react";
// import useTourPackages from "../../store/useTourPackages";

// // Validation schema
// const schema = yup.object().shape({
//   title: yup.string().required("Title is required"),
//   priceINR: yup.string().required("Title is required"),
//   nights: yup.string().required("Title is required"),
//   days: yup.string().required("Title is required"),

//   image: yup
//     .mixed()
//     .test("required", "At least one image is required", (value) => {
//       return value && value.length > 0;
//     }),
// });

// const AddTourModal = ({ formData, handleClose, isEdit }) => {
//   const { addItem, updateItem } = useTourPackages();

//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: "",
//       category: "",
//       image: [],
//     },
//   });

//   const { handleSubmit, reset } = methods;

//   // Populate form when editing
//   useEffect(() => {
//     if (isEdit && formData) {
//       reset({
//         title: formData?.title || "",
//         category: formData?.category || "",
//         image: formData?.image
//           ? [`http://localhost:3000${formData.image}`]
//           : [],
//       });
//     }
//   }, [isEdit, formData, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", data.title);
//       formDataToSend.append("category", data.category);

//       for (let i = 0; i < data.image.length; i++) {
//         if (data.image[i] instanceof File) {
//           formDataToSend.append("image", data.image[i]);
//         }
//       }

//       if (isEdit) {
//         await updateItem(formData._id, formDataToSend);
//       } else {
//         await addItem(formDataToSend);
//       }

//       handleClose(); // Close modal after submit
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}
//     >
//       <h4 className="modal-title"> {isEdit ? "Update" : "Add"} Tour </h4>

//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box>
//             <Box sx={{ mb: 2 }}>
//               <RHFTextField name="title" label="Title" />
//             </Box>
//             <Box sx={{ mb: 2 }}>
//               <RHFTextField name="priceINR" type="number" label="Price" />
//             </Box>
//           </Box>
//           <Box sx={{ mb: 2 }}>
//             <RHFTextField name="nights" label="Nights" type="number" />
//           </Box>
//           <Box sx={{ mb: 2 }}>
//             <RHFTextField name="days" label="Days" type="number" />
//           </Box>

//           <Box sx={{ mb: 2 }}>
//             <RHFImageUpload name="image" label="Gallry Image" />
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ mt: 2 }}
//               // disabled={isSubmitting}
//             >
//               {isEdit ? "Update" : "Add"}
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{ mt: 2, ml: 2 }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </FormProvider>
//     </Box>
//   );
// };

// export default AddTourModal;
"use client";

import { Box, Button, Grid, MenuItem } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField, RHFSelect } from "../ui/hook-form";
import RHFImageUpload from "../ui/hook-form/rhf-image-upload";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useEffect } from "react";
import useTourPackages from "../../store/useTourPackages";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  priceINR: yup.string().required("Price is required"),
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
  bannerImage: yup
    .mixed()
    .test(
      "required",
      "At least one bannerImage is required",
      (value) => value && value.length > 0
    ),
});

const AddTourModal = ({ formData, handleClose, isEdit }) => {
  const { addItem, updateItem } = useTourPackages();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      priceINR: "",
      nights: "",
      days: "",

      bannerImage: [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isEdit && formData) {
      reset({
        title: formData.title || "",
        priceINR: formData.priceINR || "",
        nights: formData.nights || "",
        days: formData.days || "",
        category: formData.category || "",
        bannerImage: formData.bannerImage
          ? [`http://localhost:3000${formData.bannerImage}`]
          : [],
      });
    }
  }, [isEdit, formData, reset]);

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.title);
      formDataToSend.append("priceINR", data.priceINR);
      formDataToSend.append("nights", data.nights);
      formDataToSend.append("days", data.days);

      data.bannerImage.forEach((img) => {
        if (img instanceof File) formDataToSend.append("bannerImage", img);
      });

      isEdit
        ? await updateItem(formData._id, formDataToSend)
        : await addItem(formDataToSend);

      handleClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Box
      sx={{ width: 500, bgcolor: "background.paper", p: 4, borderRadius: 2 }}
    >
      <h4 className="modal-title">{isEdit ? "Update" : "Add"} Tour</h4>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <RHFTextField name="title" label="Title" />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <RHFTextField name="priceINR" type="number" label="Price (INR)" />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <RHFTextField name="nights" type="number" label="Nights" />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <RHFTextField name="days" type="number" label="Days" />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <RHFImageUpload name="bannerImage" label="Tour Image" />
            </Grid>
          </Grid>

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

export default AddTourModal;
