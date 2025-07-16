import { TextField, Chip, Box } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';

export default function RHFTagInput({ name, label, helperText, ...other }) {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState('');

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => {
        const handleKeyDown = (e) => {
          if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (!field.value.includes(newTag)) {
              field.onChange([...field.value, newTag]);
            }
            setInputValue('');
          }
        };

        const handleDelete = (tagToDelete) => {
          field.onChange(field.value.filter((tag) => tag !== tagToDelete));
        };

        return (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {field?.value?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDelete(tag)}
                />
              ))}
            </Box>
            <TextField
              label={label}
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...other}
            />
          </>
        );
      }}
    />
  );
}
