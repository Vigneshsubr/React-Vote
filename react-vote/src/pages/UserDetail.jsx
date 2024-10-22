import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSingleUsersQuery } from '../redux/services/voterApi'; // Adjust this path as per your project structure
import Label from '../components/Label'; // Import Label component
import Input from '../components/Input'; // Import Input component

const UserDetail = ({ id }) => {
  const { data: user, error, isLoading } = useGetSingleUsersQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate(); // For navigation

  const handleEdit = () => {
    navigate(`/dashboard/updateusers/${id}`); // Navigate to the edit page for this user
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
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
    <div className="container mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h4 className="fst-italic m-0">User Details</h4>
       
      </div>
      <div className="col-12 border-0 bg-light">
        <div className="p-4">
          <div className="d-flex justify-content-center align-items-start mb-4">
            <div >
             
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
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="name" className="form-label"><strong>Name:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="name"
                value={user.name}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="email" className="form-label"><strong>Email:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="role" className="form-label"><strong>Role:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="role"
                value={user.role}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="gender" className="form-label"><strong>Gender:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="gender"
                value={user.gender}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="address" className="form-label"><strong>Address:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="address"
                value={user.address}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="age" className="form-label"><strong>Age:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="number"
                className="form-control"
                id="age"
                value={user.age}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="createdAt" className="form-label"><strong>Created At:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="createdAt"
                value={new Date(user.createdAt).toLocaleString()}
                readOnly
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <Label htmlFor="updatedAt" className="form-label"><strong>Updated At:</strong></Label>
            </div>
            <div className="col-9">
              <Input
                type="text"
                className="form-control"
                id="updatedAt"
                value={new Date(user.updatedAt).toLocaleString()}
                readOnly
              />
            </div>
            <button className="btn btn-secondary mt-4" onClick={handleBack}>Back</button>
            <button className="btn btn-primary mt-2" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
