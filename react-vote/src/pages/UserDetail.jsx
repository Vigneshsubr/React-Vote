import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSingleUsersQuery } from '../redux/services/voterApi'; 
import Label from '../components/Label'; 
import Input from '../components/Input'; 

const UserDetail = ({ id }) => {
  const { data: user, error, isLoading } = useGetSingleUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate(); 

  const handleEdit = () => {
    navigate(`/dashboard/updateusers/${id}`);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fst-italic m-0">User Details</h4>
      </div>
      <div className="col-12 border-0 bs-body-color">
        <div className="p-4">
          <div className="d-flex justify-content-center align-items-start mb-4">
            <div>
              {user.profileImage && (
                <img
                  src={`data:image/jpeg;base64,${user.profileImage}`}
                  alt={`${user.name}'s Profile`}
                  className="img-fluid rounded-circle"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    border: '3px solid #007BFF',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              )}
            </div>
          </div>

          {[
            { label: 'Name', value: user.name, id: 'name' },
            { label: 'Email', value: user.email, id: 'email' },
            { label: 'Role', value: user.role, id: 'role' },
            { label: 'Gender', value: user.gender, id: 'gender' },
            { label: 'Address', value: user.address, id: 'address' },
            { label: 'Age', value: user.age, id: 'age', type: 'number' },
            { label: 'Created At', value: new Date(user.createdAt).toLocaleString(), id: 'createdAt' },
            { label: 'Updated At', value: new Date(user.updatedAt).toLocaleString(), id: 'updatedAt' }
          ].map(({ label, value, id, type = 'text' }) => (
            <div className="row mb-3" key={id}>
              <div className="col-3">
                <Label htmlFor={id} className="form-label" style={{ color: 'white' }}>
                  <strong>{label}:</strong>
                </Label>
              </div>
              <div className="col-9">
                <Input
                  type={type}
                  className="form-control"
                  id={id}
                  value={value}
                  readOnly
                />
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-start mt-4">
            <button className="btn btn-secondary me-2" onClick={handleBack}>Back</button>
            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
