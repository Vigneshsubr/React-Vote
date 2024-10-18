import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../redux/services/voterApi';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { Icon } from '@iconify/react'; // Import Icon from Iconify

const GetVoters = () => {
    // Fetch all users
    const { data: usersData, error, isLoading, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Calculate total pages
    const totalPages = usersData ? Math.ceil(usersData.length / usersPerPage) : 1;

    // Get the current page's users
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

    const convertToBase64 = (buffer) => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
        return window.btoa(binary);
    };

    const handleUpdate = (userId) => {
        navigate(`/dashboard/updateusers/${userId}`);
        console.log(`Update user with ID: ${userId}`);
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
        navigate(`/dashboard/userdetails/${userId}`); // Assuming this is the user details route
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching users</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Voter List</h2>
            <table className="table table-striped">
                <thead>
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
                                            src={`data:image/jpeg;base64,${convertToBase64(user.profileImage)}`}
                                            alt={`${user.name}'s avatar`}
                                            style={{ width: '50px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    <span 
                                        onClick={() => handleNavigateToUserDetail(user.id)} 
                                        style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
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
                                        <Icon icon="mdi:pencil" /> {/* Update Icon */}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="btn btn-danger btn-sm mx-1"
                                    >
                                        <Icon icon="mdi:delete" /> {/* Delete Icon */}
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

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn btn-primary"
                >
                    Previous
                </button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </div>

            {/* Confirmation Modal */}
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
