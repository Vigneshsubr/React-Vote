import React, { useState } from 'react';
import { useGetElectionQuery } from '../redux/services/electionApi';
import { useNavigate } from 'react-router-dom';

const ElectionList = () => {
  const { data: elections = [], isLoading, error } = useGetElectionQuery();
  const navigate = useNavigate();
  const [selectedElection, setSelectedElection] = useState('');

  // Handle election selection change
  const handleElectionChange = (e) => {
    setSelectedElection(e.target.value);
  };

  // Navigate to election detail page when an election is selected
  const handleElectionSelect = () => {
    if (selectedElection) {
      navigate(`/dashboard/polls/${selectedElection}`);
    }
  };

  if (isLoading) return <p>Loading Elections...</p>;
  if (error) return <p>Error loading elections</p>;

  return (
    <div className="container mt-2" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fst-italic me-2">Select an Election</h4>
      </div>

      {/* Dropdown to select an election */}
      <div className="col-12 border-0 bs-body-color">
        <div className="p-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="mb-3">
            <label htmlFor="electionSelect" className="form-label">Choose an Election:</label>
            <select
              id="electionSelect"
              className="form-select"
              value={selectedElection}
              onChange={handleElectionChange}
            >
              <option value="">Select Election</option>
              {elections.map((election) => (
                <option key={election.id} value={election.id}>
                  {election.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button to navigate to the selected election */}
          <button
            className="btn btn-primary"
            onClick={handleElectionSelect}
            disabled={!selectedElection}
          >
            Go to Election
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionList;
