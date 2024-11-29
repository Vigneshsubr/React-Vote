import React from 'react';

const FormField = ({ field, register, errors }) => {
    return (
        <div className="form-group mb-2">
            <label htmlFor={field.name} className="form-label">
                <strong>{field.label}</strong>
            </label>
           
            {field.type === "textarea" ? (
                <textarea
                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                />
            ) : field.type === "select" ? (
               
                <select
                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                    {...register(field.name)}
                >
                    <option value="">{field.placeholder}</option> 
                    {field.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                
                <input
                    className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                />
            )}
            
            {errors && errors[field.name] && (
                <p className="text-danger mt-2 mb-0">{errors[field.name].message}</p>
            )}
        </div>
    );
};

export default FormField;
