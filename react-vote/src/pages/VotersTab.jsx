import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import GetVoters from './GetVoters';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import UserDetail from './UserDetail';

const VotersTab = () => {
  const [activeTab, setActiveTab] = useState('getVoters');
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user ID

  // Callback to set the selected user ID when updating
  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId);
    setActiveTab('updateVoters'); // Switch to Update Voters tab
  };
  const handleViewUser = (userId) => {
    setSelectedUserId(userId);  // Set the selected user's ID
    setActiveTab('viewVoters'); // **Switch to the 'viewVoters' tab** (Modified)
  };



  return (
    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      <Row>
        <Col sm={12}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="getVoters">Get Voters</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="createVoters">Create Voters</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="updateVoters">Update Voters</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="viewVoters">View Voters</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="getVoters">
              <GetVoters onUpdateUser={handleUpdateUser}  onViewUser={handleViewUser}  /> {/* Pass the callback */}
            </Tab.Pane>
            <Tab.Pane eventKey="createVoters">
              <CreateUser />
            </Tab.Pane>
            <Tab.Pane eventKey="updateVoters">
              {selectedUserId ? (
                <UpdateUser id={selectedUserId} /> // Render UpdateUser with ID
              ) : (
                <div>Please select a user to update.</div>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="viewVoters">
              {selectedUserId ? (
                <UserDetail id={selectedUserId} /> // Render UpdateUser with ID
              ) : (
                <div>Please select a user to update.</div>
              )}
            </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default VotersTab;
