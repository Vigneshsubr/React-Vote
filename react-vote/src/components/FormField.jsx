import React from 'react';

const FormField = ({ field, register, errors }) => {
    return (
        <div>
            <div>
                <label htmlFor={field.name} className="form-label">
                    <strong>{field.label}</strong>
                </label>
            </div>
            <div>
                {/* Handle textarea input */}
                {field.type === "textarea" ? (
                    <textarea
                        className="form-control"
                        {...register(field.name)}
                        
                        placeholder={field.placeholder}
                    />
                ) : field.type === "select" ? (
                    // Handle select input (e.g., for gender selection)
                    <select className="form-control" {...register(field.name)}>
                        {field.options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    // Handle other input types (e.g., text, email, password)
                    <input
                        className="form-control"
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                    />
                )}
                {/* Display validation errors */}
                {errors && errors[field.name] && (
                    <p className="text-danger mt-2">{errors[field.name].message}</p>
                )}
                <div className='mb-2'></div>
            </div>
        </div>
    );
};

export default FormField;
