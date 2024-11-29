import React, { useState } from 'react';
import { usePostPollMutation } from '../redux/services/pollApi';
import { useGetElectionQuery } from '../redux/services/electionApi';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePoll = () => {
  const [pollName, setPollName] = useState('');
  const [electionId, setElectionId] = useState('');
  const [postPoll, { isLoading }] = usePostPollMutation();
  const { data: elections, error: electionsError, isLoading: isElectionsLoading } = useGetElectionQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pollData = {
        pollName,
        election: { id: electionId },
      };
      await postPoll(pollData).unwrap();
      toast.success('Poll created successfully!');
    } catch (error) {
      toast.error('Failed to create poll. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fst-italic">Create New Poll</h4>
      </div>
      <div className="col-12 border-0 bs-body-color">
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-3">
                <Label htmlFor="pollName" className="form-label" style={{ color: 'white' }}>
                  <strong>Poll Name:</strong>
                </Label>
              </div>
              <div className="col-9">
                <Input
                  type="text"
                  className="form-control"
                  id="pollName"
                  value={pollName}
                  onChange={(e) => setPollName(e.target.value)}
                  required
                  style={{ color: 'black' }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-3">
                <Label htmlFor="electionId" className="form-label" style={{ color: 'white' }}>
                  <strong>Election:</strong>
                </Label>
              </div>
              <div className="col-9">
                <select
                  id="electionId"
                  className="form-select"
                  value={electionId}
                  onChange={(e) => setElectionId(e.target.value)}
                  required
                  style={{ color: 'black' }}
                >
                  <option value="" disabled>Select an Election</option>
                  {isElectionsLoading ? (
                    <option>Loading elections...</option>
                  ) : electionsError ? (
                    <option>Error loading elections</option>
                  ) : (
                    elections.map((election) => (
                      <option key={election.id} value={election.id}>
                        {election.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-12 d-flex justify-content-end">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Poll...' : 'Create Poll'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
