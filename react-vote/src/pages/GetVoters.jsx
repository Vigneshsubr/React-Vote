import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/services/voterApi';
import Modal from '../components/Modal';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const GetVoters = () => {
  const { data: usersData, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const totalPages = usersData ? Math.ceil(usersData.length / usersPerPage) : 1;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData ? usersData.slice(indexOfFirstUser, indexOfLastUser) : [];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/dashboard/updateusers/${userId}`);
  };

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userIdToDelete).unwrap();
      console.log(`User with ID: ${userIdToDelete} deleted successfully`);
      refetch();
      setIsModalOpen(false);
      setUserIdToDelete(null);
    } catch (err) {
      console.error('Failed to delete user: ', err);
    }
  };

  const handleNavigateToUserDetail = (userId) => {
    navigate(`/dashboard/userdetails/${userId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="container">
      <h3 className="fst-italic mb-4 mt-4 py-3">Voter List</h3>
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers && currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.profileImage ? (
                      <img
                        src={`data:image/jpeg;base64,${user.profileImage}`}
                        alt={`${user.name}'s Profile`}
                        className="img-fluid rounded-circle"
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          border: '3px solid #007BFF',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>
                    <span
                      onClick={() => handleNavigateToUserDetail(user.id)}
                      style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'None' }}
                    >
                      {user.name}
                    </span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="btn btn-warning btn-sm mx-1"
                    >
                      <Icon icon="mdi:pencil" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger btn-sm mx-1"
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No voters found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls mt-3">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Previous
        </button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={confirmDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this voter?</p>
      </Modal>
    </div>
  );
};

export default GetVoters;
