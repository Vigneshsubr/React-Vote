import React from 'react';

const TextArea = ({ value, onChange, placeholder, name,className }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      name={name}
    />
  );
};

export default TextArea;