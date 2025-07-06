'use client';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
// import { countries } from '@assets/data/countries';

const RHFAutocomplete = forwardRef(function RHFAutocomplete(
  { name, label, type, helperText, placeholder, onChange, ...other },
  ref
) {
  const { control, setValue } = useFormContext();

  const handleChange = (event, newValue) => {
    setValue(name, newValue, { shouldValidate: true });
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value ?? (other.multiple ? [] : null);

        const commonProps = {
          ref,
          id: `autocomplete-${name}`,
          value,
          onChange: (event, newValue) => {
            field.onChange(newValue);
            handleChange(event, newValue);
          },
          ...other,
        };

        if (type === 'country') {
          return (
            <Autocomplete
              {...commonProps}
              autoHighlight={!other.multiple}
              disableCloseOnSelect={other.multiple}
              renderOption={(props, option) => {
                const country = getCountry(option);
                if (!country.label) return null;

                return (
                  <li {...props} key={country.label}>
                    {country.label} ({country.code}) +{country.phone}
                  </li>
                );
              }}
              renderInput={(params) => {
                const country = getCountry(params.inputProps.value);

                const baseField = {
                  ...params,
                  label,
                  placeholder,
                  error: !!error,
                  helperText: error ? error.message : helperText,
                  inputProps: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                };

                if (other.multiple) {
                  return <TextField {...baseField} />;
                }

                return (
                  <TextField
                    {...baseField}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            ...(!country.code && { display: 'none' }),
                          }}
                        />
                      ),
                    }}
                  />
                );
              }}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => {
                  const country = getCountry(option);
                  return (
                    <Chip
                      {...getTagProps({ index })}
                      key={country.label}
                      label={country.label}
                      size="small"
                      variant="soft"
                    />
                  );
                })
              }
            />
          );
        }

        // Default Autocomplete
        return (
          <Autocomplete
            {...commonProps}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error.message : helperText}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        );
      }}
    />
  );
});

RHFAutocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export function getCountry(inputValue) {
  if (!inputValue) return {};
  return countries.find((country) => country.label === inputValue || country.code === inputValue) || {};
}

export default RHFAutocomplete;
