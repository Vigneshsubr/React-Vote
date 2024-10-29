import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSingleUsersQuery, useUpdateUsersMutation } from '../redux/services/voterApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = ({ id }) => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetSingleUsersQuery(id);
  const [updateUsers, { isLoading: isUpdating }] = useUpdateUsersMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    age: '',
    address: '',
    gender: '',
    profileImage: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        age: user.age || '',
        address: user.address || '',
        gender: user.gender || '',
        profileImage: null,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = new FormData();

    Object.keys(formData).forEach((key) => {
      updatedUserData.append(key, formData[key]);
    });

    try {
      await updateUsers({ id, updateUserData: updatedUserData }).unwrap();
      navigate(`/dashboard/userdetails/${id}`);
    } catch (error) {
      console.error('Update failed', error);
      alert('Update failed: ' + (error.data?.message || 'Unknown error'));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">Error fetching user details!</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-2"
          size="lg"
          style={{ cursor: 'pointer', color: 'black' }}
          onClick={handleBack}
        />
        <h4 className="fst-italic m-0">Update User</h4>
      </div>

      <div className="bg-light p-4 border rounded">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Age */}
          <div className="mb-3">
            <label htmlFor="age" className="form-label"><strong>Age</strong></label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label"><strong>Address</strong></label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label"><strong>Gender</strong></label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Profile Image */}
          <div className="mb-3">
            <label htmlFor="profileImage" className="form-label"><strong>Profile Image</strong></label>
            <input
              type="file"
              className="form-control"
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isUpdating}>
              {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Updating...</span></div> : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
