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
      style={{
        cursor: disabled ? 'not-allowed' : 'default',
      }}
     
    />
  );
};

export default Input;