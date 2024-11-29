import React, { useState } from 'react';
import { usePostElectionMutation } from '../redux/services/electionApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

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
      await postElection(formData);
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

  const fields = [
    {
      id: 'name',
      label: 'Election Name',
      type: 'text',
      placeholder: 'Enter election name',
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'date',
    },
    {
      id: 'endDate',
      label: 'End Date',
      type: 'date',
    },
  ];

  return (
    <div className="container pt-4 mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-3"
          size="lg"
          style={{ cursor: 'pointer', color: 'white' }}
          onClick={() => window.history.back()}
        />
        <h4 className="fst-italic mb-0 text-light">Create Election</h4>
      </div>

      <div className="bs-body-color p-4 border rounded">
        <form onSubmit={handleSubmit}>
          {fields.map(({ id, label, type, placeholder }) => (
            <div className="row mb-3" key={id}>
              <Label htmlFor={id} className="col-sm-2 col-form-label text-light">
                <strong>{label}</strong>
              </Label>
              <div className="col-sm-10">
                <Input
                  type={type}
                  className="form-control text-dark"
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder || ''}
                  required
                />
              </div>
            </div>
          ))}

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2 d-flex justify-content-end">
              <Button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Election'}
              </Button>
            </div>
          </div>

          {isError && <p className="text-danger mt-3">Error: {error.message}</p>}
          {isSuccess && <p className="text-success mt-3">Election created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
