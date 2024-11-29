import React, { useState } from 'react';
import { useFetchPollsByElectionIdQuery } from '../redux/services/electionApi';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Label from '../components/Label';

const PollList = () => {
  const { electionId } = useParams();
  const { data: polls = [], isLoading, error } = useFetchPollsByElectionIdQuery(electionId);
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState('');


  const handlePollChange = (e) => {
    setSelectedPoll(e.target.value);
  };

  
  const handlePollSelect = () => {
    if (selectedPoll) {
      navigate(`/dashboard/candidates/${selectedPoll}/${electionId}`);
    }
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
    return <div className="alert alert-danger text-center">Error loading polls!</div>;
  }

  return (
    <div className="container mt-2" >
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="me-2 mt-3"
            size="lg"
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={handleBack}
          />
          <h4 className="fst-italic me-2 text-white mt-3">Select a Poll</h4>
        </div>
      </div>

      
      <div className="col-12 border-0 bs-body-color">
        <div
          className="p-4"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '9px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="mb-3">
            <Label htmlFor="pollSelect" className="form-label">
              Choose a Poll:
            </Label>
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

          
          <Button
            className="btn btn-primary"
            onClick={handlePollSelect}
            disabled={!selectedPoll}
          >
            Go to Candidates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PollList;
