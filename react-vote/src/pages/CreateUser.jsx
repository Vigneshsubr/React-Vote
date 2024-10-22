import React, { useState } from 'react';
import { usePostUsersMutation } from '../redux/services/voterApi'; // Adjust the import path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    address: '',
    profile_Image: null // Adjusted the name to match backend expectation
  });

  const [postUser, { isLoading, isSuccess, isError, error }] = usePostUsersMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profile_Image: e.target.files[0] // Adjusted the name to 'profile_Image'
    });
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
      alert("User created successfully!");
      setFormData({
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        address: '',
        profile_Image: null
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-3"
          size="lg"
          style={{ cursor: 'pointer', color: 'black' }}
          onClick={() => window.history.back()} // Go back to the previous page
        />
        <h4 class="fst-italic mb-0">Create User</h4>
      </div>
      
      <div className="bg-light p-4 border rounded">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Username */}
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-2 col-form-label"><strong>Username</strong></label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label"><strong>Email</strong></label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label"><strong>Password</strong></label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="row mb-3">
            <label htmlFor="gender" className="col-sm-2 col-form-label"><strong>Gender</strong></label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Age */}
          <div className="row mb-3">
            <label htmlFor="age" className="col-sm-2 col-form-label"><strong>Age</strong></label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-2 col-form-label"><strong>Address</strong></label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="row mb-3">
            <label htmlFor="profile_Image" className="col-sm-2 col-form-label"><strong>Profile Image</strong></label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="profile_Image"
                name="profile_Image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>

          {/* Error and Success Messages */}
          {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
          {isSuccess && <p className="text-success mt-3">User created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
