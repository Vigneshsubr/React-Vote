import React, { useState } from 'react';
import { usePostUsersMutation } from '../redux/services/voterApi'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    address: '',
    profile_Image: null,
  });

  const [postUser, { isLoading, isSuccess, isError, error }] = usePostUsersMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_Image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        newUserFormData.append(key, formData[key]);
      }
    });

    try {
      await postUser(newUserFormData);
      alert('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        address: '',
        profile_Image: null,
      });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const fields = [
    { label: 'Username', name: 'name', type: 'text', placeholder: 'Enter username', required: true },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email', required: true },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password', required: true },
    { 
      label: 'Gender', 
      name: 'gender', 
      type: 'select', 
      options: ['Male', 'Female', 'Other'], 
      placeholder: 'Select Gender', 
      required: true 
    },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter age', min: 18, max: 50, required: true },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter address', required: true },
    { label: 'Profile Image', name: 'profile_Image', type: 'file', accept: 'image/*' },
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-3 mt-4 mb-4"
          style={{ cursor: 'pointer', color: 'white' }}
          onClick={() => window.history.back()}
        />
        <h4 className="fst-italic mb-4 mt-4 text-light">Create User</h4>
      </div>

      <div className="bs-body-color p-4 border rounded">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {fields.map((field) => (
            <div className="row mb-3" key={field.name}>
              <Label htmlFor={field.name} className="col-sm-2 col-form-label text-light">
                <strong>{field.label}</strong>
              </Label>
              <div className="col-sm-10">
                {field.type === 'select' ? (
                  <select
                    className="form-control"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={field.type}
                    className="form-control"
                    id={field.name}
                    name={field.name}
                    value={field.type !== 'file' ? formData[field.name] : undefined}
                    onChange={field.type === 'file' ? handleImageChange : handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    accept={field.accept}
                    required={field.required}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
              <Button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </div>

          {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
          {isSuccess && <p className="text-success mt-3">User created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
