import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostPollMutation } from '../redux/services/pollApi'; // Adjust the import path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePoll = () => {
  const navigate = useNavigate();
  const [createPoll, { isLoading, isSuccess, isError, error }] = usePostPollMutation();
  const [pollData, setPollData] = useState({ question: '', electionId: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPollData({ ...pollData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pollData.question || !pollData.electionId) {
      alert('All fields are required.');
      return;
    }

    try {
      await createPoll(pollData).unwrap();
      alert('Poll created successfully!');
      navigate(-1); // Navigate back after successful creation
    } catch (err) {
      console.error('Failed to create poll:', err);
      alert('Failed to create poll: ' + (error.data?.message || 'Unknown error'));
    }
  };

  // Handle Back Button - navigate to previous page
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="me-2"
          size="lg"
          style={{ cursor: 'pointer', color: 'black' }}
          onClick={handleBack} // Go back to the previous page
        />
        <h4 className="fst-italic m-0">Create Poll</h4>
      </div>

      <div className="bg-light p-4 border rounded">
        <Form onSubmit={handleSubmit}>
          {/* Question */}
          <Form.Group controlId="formQuestion">
            <Form.Label><strong>Question</strong></Form.Label>
            <Form.Control
              type="text"
              name="question"
              value={pollData.question}
              onChange={handleChange}
              required
              placeholder="Enter poll question"
            />
          </Form.Group>

          {/* Election ID */}
          <Form.Group controlId="formElectionId" className="mt-3">
            <Form.Label><strong>Election ID</strong></Form.Label>
            <Form.Control
              type="text"
              name="electionId"
              value={pollData.electionId}
              onChange={handleChange}
              required
              placeholder="Enter election ID"
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid mt-4">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Creating...</span></div> : 'Create Poll'}
            </Button>
          </div>

          {/* Back Button */}
          <div className="d-grid mt-3">
            <Button type="button" variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </div>

          {/* Error and Success Messages */}
          {isError && <Alert variant="danger" className="mt-3">Error: {error.message}</Alert>}
          {isSuccess && <Alert variant="success" className="mt-3">Poll created successfully!</Alert>}
        </Form>
      </div>
    </div>
  );
};

export default CreatePoll;
