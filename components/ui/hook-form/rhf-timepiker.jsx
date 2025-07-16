import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
 

// ----------------------------------------------------------------------

export default function RHFTimePicker({ name, label, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <TimePicker
            {...field}
            label={label}
            onChange={(val) => field.onChange(val)}
            value={field.value || null}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error ? error?.message : helperText}
              />
            )}
            {...other}
          />
        )}
      />
    </LocalizationProvider>
  );
}

 