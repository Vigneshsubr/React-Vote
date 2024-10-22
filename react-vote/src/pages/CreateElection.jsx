import React, { useState } from 'react';
import { usePostElectionMutation } from '../redux/services/electionApi'; // Adjust the import path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateElection = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const [postElection, { isLoading, isSuccess, isError, error }] = usePostElectionMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,  
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postElection(formData); // Submit the election data
      alert('Election created successfully!');
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
      });
    } catch (err) {
      console.error('Error creating election:', err);
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
        <h4 className="fst-italic mb-0">Create Election</h4>
      </div>
      
      <div className="bg-light p-4 border rounded">
        <form onSubmit={handleSubmit}>
          {/* Election Name */}
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-2 col-form-label"><strong>Election Name</strong></label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter election name"
                required
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="row mb-3">
            <label htmlFor="startDate" className="col-sm-2 col-form-label"><strong>Start Date</strong></label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div className="row mb-3">
            <label htmlFor="endDate" className="col-sm-2 col-form-label"><strong>End Date</strong></label>
            <div className="col-sm-10">
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Election'}
              </button>
            </div>
          </div>

          {/* Error and Success Messages */}
          {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
          {isSuccess && <p className="text-success mt-3">Election created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
