import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import CreateCandidate from './CreateCandidate'; 
import GetCandidates from './GetCandidates';   

const CandidateTab = () => {
  const [activeTab, setActiveTab] = useState('createCandidate');

  const handleUpdateCandidate = (candidateId) => {
    setActiveTab('updateCandidate'); 
    
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
              <CreateCandidate />
            </Tab.Pane>
            <Tab.Pane eventKey="viewCandidates">
              <GetCandidates 
                onUpdateCandidate={handleUpdateCandidate}  
                onViewCandidate={handleViewCandidate}    
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
