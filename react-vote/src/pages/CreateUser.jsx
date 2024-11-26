import React, { useState } from 'react';
import { usePostUsersMutation } from '../redux/services/voterApi'; 
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
    profile_Image: null 
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
      profile_Image: e.target.files[0] 
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
    <div className="container mt-5" >{/*style={{ backgroundColor: '#F5F5F7', padding: '20px', borderRadius: '8px' }} */}
      <div className="d-flex align-items-center mb-4 ">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-3 mt-4 mb-4"
          style={{ cursor: 'pointer', color: 'black' }}
          onClick={() => window.history.back()} 
        />
        <h4 className="fst-italic mb-4 mt-4 text-light">Create User</h4>
      </div>
      
      <div className="bs-body-color p-4 border  rounded ">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-2 col-form-label text-light"><strong>Username</strong></label>
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

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label text-light"><strong>Email</strong></label>
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

          <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label text-light"><strong>Password</strong></label>
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

          <div className="row mb-3">
            <label htmlFor="gender" className="col-sm-2 col-form-label text-light"><strong>Gender</strong></label>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="age" className="col-sm-2 col-form-label text-light"><strong>Age</strong></label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="18" 
                max="50" 
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-2 col-form-label text-light"><strong>Address</strong></label>
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

          <div className="row mb-3">
            <label htmlFor="profile_Image" className="col-sm-2 col-form-label text-light"><strong>Profile Image</strong></label>
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

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary " disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create User'}
              </button>
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
