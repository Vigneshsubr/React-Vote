import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import CreateCandidate from './CreateCandidate'; // Component to create a candidate
//import ViewCandidates from './ViewCandidates';   // Component to view all candidates
//import UpdateCandidate from './UpdateCandidate'; // Component to update a candidate

const CandidateTab = () => {
  const [activeTab, setActiveTab] = useState('createCandidate');

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
            {/* <Tab.Pane eventKey="viewCandidates">
              <ViewCandidates /> 
            </Tab.Pane>
            <Tab.Pane eventKey="updateCandidate">
              <UpdateCandidate /> 
            </Tab.Pane> */}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default CandidateTab;
