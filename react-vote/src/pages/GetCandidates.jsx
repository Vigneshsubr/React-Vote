import React, { useState } from 'react';
import { useGetAllCandidateQuery, useDeleteCandidateMutation } from '../redux/services/candidateApi';
import Modal from '../components/Modal';
import { Icon } from '@iconify/react';

const GetCandidates = ({ onUpdateCandidate, onViewCandidate }) => {
    const { data: candidatesData, error, isLoading, refetch } = useGetAllCandidateQuery();
    const [deleteCandidate] = useDeleteCandidateMutation(); // Hook for delete mutation

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidateIdToDelete, setCandidateIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 5;

    // Pagination logic
    const totalPages = candidatesData ? Math.ceil(candidatesData.length / candidatesPerPage) : 1;
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidatesData ? candidatesData.slice(indexOfFirstCandidate, indexOfLastCandidate) : [];

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

    const handleUpdate = (candidateId) => {
        onUpdateCandidate(candidateId);
    };

    const handleDelete = (candidateId) => {
        setCandidateIdToDelete(candidateId); // Set the ID of the candidate to delete
        setIsModalOpen(true); // Open the modal for confirmation
    };

    const confirmDelete = async () => {
        try {
            await deleteCandidate(candidateIdToDelete).unwrap(); // Call the delete mutation
            console.log(`Candidate with ID: ${candidateIdToDelete} deleted successfully`);
            refetch(); // Refetch candidates to update the list
            setIsModalOpen(false); // Close the modal
            setCandidateIdToDelete(null); // Reset the candidate ID to delete
        } catch (err) {
            console.error('Failed to delete candidate: ', err);
        }
    };

    const handleNavigateToCandidateDetail = (candidateId) => {
        onViewCandidate(candidateId);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching candidates</div>;
    }

    return (
        <div className="container mt-5">
            <h4 className="fst-italic mb-4">Candidate List</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Poll Name</th> {/* Changed to Poll Name */}
                        <th>Election Name</th> {/* Changed to Election Name */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCandidates && currentCandidates.length > 0 ? (
                        currentCandidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>
                                    <div className="text-center">
                                        {candidate.profileImage ? (
                                            <img
                                                src={`data:image/jpeg;base64,${candidate.profileImage}`}
                                                alt="Profile"
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <img
                                                src="path/to/default/avatar.png" // Replace with the path to your default avatar image
                                                alt="Default Avatar"
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <span
                                        onClick={() => handleNavigateToCandidateDetail(candidate.id)}
                                        style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}
                                    >
                                        {candidate.name}
                                    </span>
                                </td>
                                <td>{candidate.email || '--'}</td>
                                <td>{candidate.gender || '--'}</td>
                                <td>{candidate.age || '--'}</td>
                                <td>{candidate.address || '--'}</td>
                                <td>{candidate.poll ? candidate.poll.pollName : '--'}</td> {/* Displaying Poll Name */}
                                <td>{candidate.poll && candidate.poll.election ? candidate.poll.election.name : '--'}</td> {/* Displaying Election Name */}
                                <td>
                                    <button
                                        onClick={() => handleUpdate(candidate.id)}
                                        className="btn btn-warning btn-sm mx-1"
                                    >
                                        <Icon icon="mdi:pencil" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(candidate.id)}
                                        className="btn btn-danger btn-sm mx-1"
                                    >
                                        <Icon icon="mdi:delete" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No candidates found</td>
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
                onSave={confirmDelete} // Confirm deletion action
                title="Confirm Deletion"
            >
                <p>Are you sure you want to delete this candidate?</p>
            </Modal>
        </div>
    );
};

export default GetCandidates;
