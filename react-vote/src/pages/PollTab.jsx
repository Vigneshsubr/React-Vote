import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import CreatePoll from './CreatePoll'; 

const PollTab = () => {
  const [activeTab, setActiveTab] = useState('createPoll');

  return (
    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      <Row>
        <Col sm={12}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="createPoll">Create Poll</Nav.Link> 
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="createPoll">
              <CreatePoll />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default PollTab;
