import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { X } from "lucide-react";
import useImageDelete from "@/store/useDeleteImage";

export default function RHFImageUpload({
  name,
  label,
  maxImages = 5,
  ...other
}) {
  const { control, watch } = useFormContext();
  const watchedImages = watch(name);
  const [localImages, setLocalImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { deleteImageFromServer } = useImageDelete();

  const extractFormValue = (images) =>
    images.map((img) => {
      if (img.file) return img.file;
      if (img.isFromServer) return img.preview.split("/").pop();
      return img.preview;
    });

  // ✅ Whenever form value updates (e.g., from reset), sync to localImages
  useEffect(() => {
    if (watchedImages?.length > 0) {
      const formatted = watchedImages.map((item) =>
        typeof item === "string"
          ? {
              file: null,
              preview: item.startsWith("http")
                ? item
                : `${process.env.NEXT_PUBLIC_IMAGE_URL}${item}`,
              isFromServer: true,
            }
          : {
              file: item,
              preview: URL.createObjectURL(item),
              isFromServer: false,
            }
      );
      setLocalImages(formatted);
    } else {
      setLocalImages([]); // Clear on empty reset
    }
  }, [watchedImages]);

  const handleImageChange = (e, onChange) => {
    setErrorMsg("");
    const files = Array.from(e.target.files);

    const existingNames = localImages
      .filter((img) => img.file)
      .map((img) => img.file.name);

    const nonDuplicateFiles = files.filter(
      (file) => !existingNames.includes(file.name)
    );

    if (nonDuplicateFiles.length !== files.length) {
      setErrorMsg("Duplicate image names are not allowed.");
    }

    const total = localImages.length + nonDuplicateFiles.length;
    if (total > maxImages) {
      setErrorMsg(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    const previews = nonDuplicateFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isFromServer: false,
    }));

    const updatedImages = [...localImages, ...previews];
    setLocalImages(updatedImages);
    onChange(extractFormValue(updatedImages));
  };

  const handleDelete = async (index, onChange) => {
    const imgToDelete = localImages[index];

    if (imgToDelete.isFromServer) {
      const filename = imgToDelete.preview.split("/").pop();
      await deleteImageFromServer(filename);
    }

    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    onChange(extractFormValue(updatedImages));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box className="image-upload-container">
          <Typography variant="subtitle1" gutterBottom>
            {label}
          </Typography>

          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 2 }}
            disabled={localImages.length >= maxImages}
          >
            Upload Images
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => handleImageChange(e, onChange)}
              {...other}
            />
          </Button>

          {errorMsg && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          {localImages.length > 0 && (
            <ImageList cols={3} rowHeight={140}>
              {localImages.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    src={img.preview}
                    alt={`Upload ${index}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleDelete(index, onChange)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <X />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          )}

          {error && <Typography color="error">{error.message}</Typography>}
        </Box>
      )}
    />
  );
}
