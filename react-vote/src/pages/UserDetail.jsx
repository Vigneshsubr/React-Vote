import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleUsersQuery } from '../redux/services/voterApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import Label from '../components/Label';
import Input from '../components/Input';

const UserDetail = () => {
  const { id } = useParams();
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
    <div className="container mt-2 " >{/*style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}/*}
      {/* Row for Back Button and Title */}
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="me-2 mt-4"
            size="lg"
            style={{ cursor: 'pointer', color: 'black' }}
            onClick={handleBack}
          />
          <h4 className="fst-italic text-white  me-2 mt-4">User Details</h4>
        </div>

        {/* Edit Icon */}
        <FontAwesomeIcon
          icon={faEdit}
          className="me-3 mt-4"
          size="lg"
          style={{ cursor: 'pointer', color: '#007bff' }}
          onClick={handleEdit}
          title="Edit User"
        />
      </div>

      <div className="col-12 border rounded">
        <div
          className="p-4"
          style={{
            //backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="d-flex justify-content-center align-items-start mb-4">
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

          {[
            { label: 'Name', value: user.name, id: 'name' },
            { label: 'Email', value: user.email, id: 'email' },
            { label: 'Role', value: user.role, id: 'role' },
            { label: 'Gender', value: user.gender, id: 'gender' },
            { label: 'Address', value: user.address, id: 'address' },
            { label: 'Age', value: user.age, id: 'age', type: 'number' },
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
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ced4da',
                    padding: '8px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
