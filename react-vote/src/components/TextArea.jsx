import React from 'react';

const TextArea = ({ value, onChange, placeholder, name }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default TextArea;