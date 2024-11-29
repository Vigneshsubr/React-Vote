import React, { useState } from 'react';
import { useGetElectionQuery } from '../redux/services/electionApi';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Label from '../components/Label';

const ElectionList = () => {
  const { data: elections = [], isLoading, error } = useGetElectionQuery();
  const navigate = useNavigate();
  const [selectedElection, setSelectedElection] = useState('');

  
  const handleElectionChange = (e) => {
    setSelectedElection(e.target.value);
  };

  
  const handleElectionSelect = () => {
    if (selectedElection) {
      navigate(`/dashboard/polls/${selectedElection}`);
    }
  };

  if (isLoading) return <p>Loading Elections...</p>;
  if (error) return <p>Error loading elections</p>;

  return (
    <div className="container mt-2" >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fst-italic text-white mt-3 me-2">Select an Election</h4>
      </div>

    
      <div className="col-12 border-0">
        <div className="p-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="mb-3">
            <Label htmlFor="electionSelect" className="form-label">Choose an Election:</Label>
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

          
          <Button
            className="btn btn-primary"
            onClick={handleElectionSelect}
            disabled={!selectedElection}
          >
            Go to Election
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectionList;
