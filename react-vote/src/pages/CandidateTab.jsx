import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import CreateCandidate from './CreateCandidate'; // Component to create a candidate
import GetCandidates from './GetCandidates';   // GetCandidates component

const CandidateTab = () => {
  const [activeTab, setActiveTab] = useState('createCandidate');

  const handleUpdateCandidate = (candidateId) => {
    setActiveTab('updateCandidate'); // Switch to the 'updateCandidate' tab
    // You can pass the candidateId to a state if needed for updating candidate
  };

  const handleViewCandidate = (candidateId) => {
    // Logic to handle viewing a specific candidate by ID
  };

  return (
    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      <Row>
        <Col sm={12}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="createCandidate">Create Candidate</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="viewCandidates">View Candidates</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="updateCandidate">Update Candidate</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="createCandidate">
              <CreateCandidate /> {/* Create Candidate Form */}
            </Tab.Pane>
            <Tab.Pane eventKey="viewCandidates">
              <GetCandidates 
                onUpdateCandidate={handleUpdateCandidate}  // Pass update handler
                onViewCandidate={handleViewCandidate}      // Pass view handler
              /> 
            </Tab.Pane>
            {/* <Tab.Pane eventKey="updateCandidate">
             
            </Tab.Pane> */}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default CandidateTab;
