import React from 'react';

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  name,
  disabled,
  className,
  maxLength,
  minLength,
  pattern,
  required,
  autoFocus,
  autoComplete,
  readOnly,
  accept,
  min,
  max
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      className={className}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      readOnly={readOnly}
      accept={accept}
      min={min}
      max={max}
      style={{
        cursor: disabled ? 'not-allowed' : 'default',
      }}
     
    />
  );
};

export default Input;