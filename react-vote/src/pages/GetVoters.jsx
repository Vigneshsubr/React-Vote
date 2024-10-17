import React, { useState } from 'react';
import { useGetUsersQuery } from '../redux/services/voterApi'; // Adjust the import based on your project structure
import { useNavigate} from 'react-router-dom';

const GetVoters = () => {
    // Fetch all users
    const { data: usersData, error, isLoading } = useGetUsersQuery();
    const navigate = useNavigate();
   

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Set the number of users per page

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
        return window.btoa(binary); // Base64 encode
    };

    const handleUpdate = (userId) => {
        // Logic for updating the user, you can navigate to an update page or show a modal
        navigate(`/dashboard/updateusers/${userId}`)
        console.log(`Update user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        // Logic for deleting the user
        console.log(`Delete user with ID: ${userId}`);
        navigate(`/dashboard/deleteusers/${userId}`)
        // You can also call an API to delete the user and then refetch the data
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
                                    {/* Convert profileImage byte array to Base64 */}
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
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.age}</td>
                                <td>{user.address}</td>
                                <td>
                                    {/* Action buttons */}
                                    <button
                                        onClick={() => handleUpdate(user.id)}
                                        className="btn btn-warning btn-sm mx-1"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="btn btn-danger btn-sm mx-1"
                                    >
                                        Delete
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
        </div>
    );
};

export default GetVoters;
