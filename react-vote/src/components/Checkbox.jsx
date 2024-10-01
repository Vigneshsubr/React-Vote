import React from 'react';
import Label from './Label'; 

const Checkbox = ({ className,label,labelClassName, checked, onChange }) => {
  return (
    <div className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={label}
      />
      <Label htmlFor={label} className={labelClassName}>{label}</Label>
    </div>
  );
};

export default Checkbox;