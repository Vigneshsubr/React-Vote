// import React, { useState } from 'react';
// import { Tab, Nav, Row, Col } from 'react-bootstrap';
// // import GetElections from './GetElections';  // Component to get all elections
// import CreateElection from './CreateElection';  // Component to create an election
// // import UpdateElection from './UpdateElection';  // Component to update an election
// // import ElectionDetail from './ElectionDetail';  // Component to get a single election

// const ElectionTab = () => {
//   const [activeTab, setActiveTab] = useState('createElection');
//   //const [selectedElectionId, setSelectedElectionId] = useState(null); // State for selected election ID

//   // Callback to set the selected election ID when updating or viewing
//   // const handleUpdateElection = (electionId) => {
//   //   setSelectedElectionId(electionId);
//   //   setActiveTab('updateElection'); // Switch to Update Election tab
//   // };

//   // const handleViewElection = (electionId) => {
//   //   setSelectedElectionId(electionId);
//   //   setActiveTab('electionDetail'); // Switch to Election Detail tab
//   // };

//   return (
//     <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//       <Row>
//         <Col sm={12}>
//           <Nav variant="tabs">
//             <Nav.Item>
//               <Nav.Link eventKey="createElection">Create Election</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="getElections">Get All Elections</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="updateElection">Update Election</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="electionDetail">View Election</Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col sm={12}>
//           <Tab.Content>
//             <Tab.Pane eventKey="createElection">
//               <CreateElection />
//             </Tab.Pane>
//             {/* <Tab.Pane eventKey="getElections">
//               <GetElections onUpdateElection={handleUpdateElection} onViewElection={handleViewElection} />
//             </Tab.Pane>
//             <Tab.Pane eventKey="updateElection">
//               {selectedElectionId ? (
//                 <UpdateElection id={selectedElectionId} /> // Render UpdateElection with ID
//               ) : (
//                 <div>Please select an election to update.</div>
//               )}
//             </Tab.Pane>
//             <Tab.Pane eventKey="electionDetail">
//               {selectedElectionId ? (
//                 <ElectionDetail id={selectedElectionId} /> // Render ElectionDetail with ID
//               ) : (
//                 <div>Please select an election to view.</div>
//               )}
//             </Tab.Pane> */}
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//   );
// };

// export default ElectionTab;
