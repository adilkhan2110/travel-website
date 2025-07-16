import PropTypes from 'prop-types';
import React from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function RHFTextWithoutValidation({ name, helperText, placeholder, ...other }) {


  return (
    
        <TextareaAutosize
        
          style={{
            lineHeight: '1.5714285714285714',
            fontSize: '0.875rem',
            fontFamily: 'Public Sans, sans-serif',
            fontWeight: '400',
            padding: '10px',
            border: '1px solid #d7e0ed',
            borderRadius: '10px',
            resize:'none',
            width: '100%',
            background: 'none'
          }}
          placeholder={placeholder}
          minRows={3}
          maxRows={6}
          onChange={(event) => field.onChange(event.target.value)}
          {...other}
        />
   
   
  );
}

RHFTextWithoutValidation.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
