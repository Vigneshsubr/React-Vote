import React, { useState } from 'react';
import { usePostCandidateMutation } from '../redux/services/candidateApi'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Label from '../components/Label';

const CreateCandidate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    address: '',
    pollId: '',
    profile_Image: null,
  });

  const [postCandidate, { isLoading, isSuccess, isError, error }] = usePostCandidateMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profile_Image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const candidateFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        candidateFormData.append(key, formData[key]);
      }
    });

    try {
      await postCandidate(candidateFormData);
      alert('Candidate created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        address: '',
        pollId: '',
        profile_Image: null,
      });
    } catch (err) {
      console.error('Error creating candidate:', err);
    }
  };

  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: "Enter candidate's name", required: true },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email', required: true },
    { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter password', required: true },
    { label: 'Gender', name: 'gender', type: 'select', options: ['male', 'female', 'other'], required: true },
    { label: 'Age', name: 'age', type: 'number', placeholder: 'Enter age', min: 18, max: 50, required: true },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter address', required: true },
    { label: 'Poll ID', name: 'pollId', type: 'text', placeholder: 'Enter Poll ID', required: true },
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4 pt-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-3"
          size="lg"
          style={{ cursor: 'pointer', color: 'white' }}
          onClick={() => window.history.back()}
        />
        <h4 className="fst-italic mb-0 text-light">Create Candidate</h4>
      </div>

      <div className="p-2 border rounded">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {fields.map(({ label, name, type, ...rest }) => (
            <div className="row mb-3" key={name}>
              <Label htmlFor={name} className="col-sm-2 col-form-label text-light">
                <strong>{label}</strong>
              </Label>
              <div className="col-sm-10">
                {type === 'select' ? (
                  <select
                    className="form-control text-dark"
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    {...rest}
                  >
                    <option value="">Select {label}</option>
                    {rest.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={type}
                    className="form-control text-dark"
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    {...rest}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="row mb-3">
            <Label htmlFor="profile_Image" className="col-sm-2 col-form-label text-light">
              <strong>Profile Image</strong>
            </Label>
            <div className="col-sm-10">
              <Input
                type="file"
                className="form-control"
                id="profile_Image"
                name="profile_Image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
              <Button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </div>

          {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
          {isSuccess && <p className="text-success mt-3">Candidate created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateCandidate;
