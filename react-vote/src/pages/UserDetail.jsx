import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleUsersQuery } from '../redux/services/voterApi'; // Adjust this path as per your project structure

const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const { data: user, error, isLoading } = useGetSingleUsersQuery(id, {
    refetchOnMountOrArgChange: true, // Ensure it refetches the user when the ID changes
  });

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
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h3>User Details</h3>
            </div>
            <div className="card-body">
              {user.profileImage && (
                <div className="text-center mb-3">
                  {/* Convert the byte array to a data URL and display the image */}
                  <img
                    src={`data:image/jpeg;base64,${user.profileImage}`}
                    alt={`${user.name}'s Profile`}
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="mb-3">
                <strong>Name:</strong> <span>{user.name}</span>
              </div>
              <div className="mb-3">
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
              <div className="mb-3">
                <strong>Role:</strong> <span>{user.role}</span>
              </div>
              <div className="mb-3">
                <strong>Gender:</strong> <span>{user.gender}</span>
              </div>
              <div className="mb-3">
                <strong>Address:</strong> <span>{user.address}</span>
              </div>
              <div className="mb-3">
                <strong>Age:</strong> <span>{user.age}</span>
              </div>
              <div className="mb-3">
                <strong>Created At:</strong> <span>{new Date(user.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-3">
                <strong>Updated At:</strong> <span>{new Date(user.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
