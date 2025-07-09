import React from "react";
import ReactQuill from "react-quill";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { FormHelperText, FormLabel, Box } from "@mui/material";

export default function RHFQuillEditor({ name, label, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ mb: 2 }}>
          {label && (
            <FormLabel sx={{ mb: 1, display: "block" }}>{label}</FormLabel>
          )}
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            {...other}
            style={{ height: "200px" }}
          />
          <FormHelperText error={!!error}>
            {error ? error.message : helperText}
          </FormHelperText>
        </Box>
      )}
    />
  );
}
