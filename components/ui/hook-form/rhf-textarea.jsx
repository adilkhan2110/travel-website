import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function RHFTextareaAutosize({ name, helperText, placeholder, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextareaAutosize
          {...field}
          style={{
            lineHeight: '1.5714285714285714',
            fontSize: '0.875rem',
            fontFamily: 'Public Sans, sans-serif',
            fontWeight: '400',
            padding: '16.5px 14px',
            border: '1px solid #d7e0ed',
            borderRadius: '15px',
          }}
          placeholder={placeholder}
          minRows={3}
          maxRows={6}
          onChange={(event) => field.onChange(event.target.value)}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}

RHFTextareaAutosize.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // Adding placeholder prop
};
