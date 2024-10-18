import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleUsersQuery } from '../redux/services/voterApi'; // Adjust this path as per your project structure

const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const { data: user, error, isLoading } = useGetSingleUsersQuery(id, {
    refetchOnMountOrArgChange: true, // Ensure it refetches the user when the ID changes
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
    <div className="container-fluid vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-sm border-light" style={{ borderRadius: '10px', height: '100%' }}>
            <div className="card-header text-center" style={{ backgroundColor: '#007BFF', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              <h3>User Details</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                {user.profileImage && (
                  <img
                    src={`data:image/jpeg;base64,${user.profileImage}`}
                    alt={`${user.name}'s Profile`}
                    className="img-fluid rounded-circle"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      border: '3px solid #007BFF', // Border color
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                )}
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Name:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.name}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Email:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.email}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Role:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.role}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Gender:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.gender}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Address:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.address}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Age:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{user.age}</span>
              </div>
              <div className="mb-3" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <strong>Created At:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{new Date(user.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-3">
                <strong>Updated At:</strong>
                <span className="ms-2" style={{ color: '#343a40' }}>{new Date(user.updatedAt).toLocaleString()}</span>
              </div>
              {/* Buttons for Edit and Back */}
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-secondary me-3" onClick={handleBack}>Back</button>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
