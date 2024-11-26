import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/services/voterApi';
import Modal from '../components/Modal';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Table from '../components/Table'; // Import the reusable Table component

const GetVoters = () => {
  const { data: usersData, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const MAX_PAGE_COUNT = 10;
  const totalPages = Math.min(
    usersData ? Math.ceil(usersData.length / usersPerPage) : 1,
    MAX_PAGE_COUNT
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData ? usersData.slice(indexOfFirstUser, indexOfLastUser) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUsersPerPageChange = (e) => {
    const newUsersPerPage = Math.ceil(Number(e.target.value) / 5) * 5;
    setUsersPerPage(newUsersPerPage);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
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

  const handleCreateUser = () => {
    navigate('/dashboard/createuser');
  };

  const columns = [
    { header: 'ID', key: 'id' },
    {
      header: 'Avatar',
      key: 'profileImage',
      render: (value) =>
        value ? (
          <img
            src={`data:image/jpeg;base64,${value}`}
            alt="Profile"
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
        ),
    },
    {
      header: 'Name',
      key: 'name',
      render: (value, row) => (
        <span
          onClick={() => handleNavigateToUserDetail(row.id)}
          style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
        >
          {value}
        </span>
      ),
    },
    { header: 'Email', key: 'email' },
    { header: 'Gender', key: 'gender' },
    { header: 'Age', key: 'age' },
    { header: 'Address', key: 'address' },
  ];

  const actions = [
    {
      label: <Icon icon="mdi:pencil" />,
      variant: 'warning',
      onClick: (row) => handleUpdate(row.id),
    },
    {
      label: <Icon icon="mdi:delete" />,
      variant: 'danger',
      onClick: (row) => handleDelete(row.id),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3 className="fst-italic text-light mt-3">Voter List</h3>
        <button className="btn btn-primary me-4 mt-3" onClick={handleCreateUser}>
          Create User
        </button>
      </div>

      <Table columns={columns} data={currentUsers} actions={actions} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        usersPerPage={usersPerPage}
        onUsersPerPageChange={handleUsersPerPageChange}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={confirmDelete} title="Confirm Deletion">
        <p>Are you sure you want to delete this voter?</p>
      </Modal>
    </div>
  );
};

export default GetVoters;
