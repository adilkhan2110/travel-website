import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function NewRHFAutocomplete({
  name,
  options,
  getOptionLabel,
  helperText,
  onChangehandel,
  label,
  value,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...other}
            options={options}
            getOptionLabel={getOptionLabel}
            value={field.value || value || null} // Handle value for add/edit cases
            onChange={(event, newValue) => {
              field.onChange(newValue);
              if (onChangehandel) {
                onChangehandel(event, newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                label={label}
                {...params}
                fullWidth
                error={!!error}
                helperText={error ? error?.message : helperText}
              />
            )}
          />
      )}
    />
  );
}

NewRHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  onChangehandel: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.object, // Add value prop for initial value
};
