import React, { useState } from 'react';
import { useFetchPollsByElectionIdQuery } from '../redux/services/electionApi';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PollList = () => {
  const { electionId } = useParams();
  const { data: polls = [], isLoading, error } = useFetchPollsByElectionIdQuery(electionId);
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState('');

  // Handle poll selection change
  const handlePollChange = (e) => {
    setSelectedPoll(e.target.value);
  };

  // Navigate to candidates page when a poll is selected
  const handlePollSelect = () => {
    if (selectedPoll) {
      navigate(`/dashboard/candidates/${selectedPoll}/${electionId}`);
    }
  };

  // Navigate back
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
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
    return <div className="alert alert-danger text-center">Error loading polls!</div>;
  }

  return (
    <div className="container mt-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      {/* Header with Back Arrow and Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="me-2"
            size="lg"
            style={{ cursor: 'pointer', color: 'black' }}
            onClick={handleBack}
          />
          <h4 className="fst-italic me-2">Select a Poll</h4>
        </div>
      </div>

      {/* Dropdown to select a poll */}
      <div className="col-12 border-0 bs-body-color">
        <div
          className="p-4"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="mb-3">
            <label htmlFor="pollSelect" className="form-label">
              Choose a Poll:
            </label>
            <select
              id="pollSelect"
              className="form-select"
              value={selectedPoll}
              onChange={handlePollChange}
            >
              <option value="">Select Poll</option>
              {polls.map((poll) => (
                <option key={poll.id} value={poll.id}>
                  {poll.pollName}
                </option>
              ))}
            </select>
          </div>

          {/* Button to navigate to the selected poll's candidates */}
          <button
            className="btn btn-primary"
            onClick={handlePollSelect}
            disabled={!selectedPoll}
          >
            Go to Candidates
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollList;
