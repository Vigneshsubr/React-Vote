import React from 'react';

const Select = ({
  options,
  value,
  onChange,
  name,
  placeholder,
  disabled,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={className}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;