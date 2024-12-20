import React, { useState } from "react";
import {
  useGetAllCandidateQuery,
  useDeleteCandidateMutation,
} from "../redux/services/candidateApi";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Pagination from "../components/Pagination";

const GetCandidates = ({ onUpdateCandidate, onViewCandidate }) => {
  const { data: candidatesData, error, isLoading, refetch } = useGetAllCandidateQuery();
  const [deleteCandidate] = useDeleteCandidateMutation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateIdToDelete, setCandidateIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(7);

  const totalPages = candidatesData ? Math.ceil(candidatesData.length / usersPerPage) : 1;
  const indexOfLastCandidate = currentPage * usersPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - usersPerPage;
  const currentCandidates = candidatesData
    ? candidatesData.slice(indexOfFirstCandidate, indexOfLastCandidate)
    : [];

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
    setCandidateIdToDelete(candidateId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCandidate(candidateIdToDelete).unwrap();
      console.log(`Candidate with ID: ${candidateIdToDelete} deleted successfully`);
      refetch();
      setIsModalOpen(false);
      setCandidateIdToDelete(null);
    } catch (err) {
      console.error("Failed to delete candidate: ", err);
    }
  };

  const handleNavigateToCandidateDetail = (candidateId) => {
    onViewCandidate(candidateId);
  };

  const handleUsersPerPageChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleCreateCandidate = () => {
    navigate("/dashboard/createcandidate");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching candidates</div>;
  }

  return (
    <div className="container pt-5">
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <h4 className="fst-italic text-light">Candidate List</h4>
        </div>
        <div className="col-12 col-md-6 text-md-end">
          <button onClick={handleCreateCandidate} className="btn btn-primary">
            Create Candidate
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-danger">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>Poll Name</th>
              <th>Election Name</th>
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
                          className="img-fluid rounded-circle"
                          style={{ width: "40px", height: "40px" }}
                        />
                      ) : (
                        <img
                          src="path/to/default/avatar.png"
                          alt="Default Avatar"
                          className="img-fluid rounded-circle"
                          style={{ width: "40px", height: "40px" }}
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      onClick={() => handleNavigateToCandidateDetail(candidate.id)}
                      style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}
                    >
                      {candidate.name}
                    </span>
                  </td>
                  <td>{candidate.email || "--"}</td>
                  <td>{candidate.gender || "--"}</td>
                  <td>{candidate.age || "--"}</td>
                  <td>{candidate.address || "--"}</td>
                  <td>{candidate.poll ? candidate.poll.pollName : "--"}</td>
                  <td>
                    {candidate.poll && candidate.poll.election
                      ? candidate.poll.election.name
                      : "--"}
                  </td>
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
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        usersPerPage={usersPerPage}
        onUsersPerPageChange={handleUsersPerPageChange}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={confirmDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this candidate?</p>
      </Modal>
    </div>
  );
};

export default GetCandidates;
