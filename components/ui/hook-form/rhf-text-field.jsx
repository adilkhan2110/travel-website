import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value =
          type === 'number' && field.value === 0
            ? ''
            : field.value ?? ''; // Ensure value is always defined

        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={value}
            onChange={(event) => {
              let val = event.target.value;
              if (type === 'tel') {
                val = val.replace(/[^0-9]/g, '').replace(/^0+/, '');
              }
              field.onChange(val);
            }}
            onKeyDown={(event) => {
              if (type === 'number' && (event.key === 'e' || event.key === 'E')) {
                event.preventDefault();
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
