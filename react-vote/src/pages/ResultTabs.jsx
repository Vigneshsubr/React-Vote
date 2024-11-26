// import React, { useState } from 'react';
// import { Tab, Nav, Row, Col } from 'react-bootstrap';
// import CalculateResultsPage from '../pages/CalculateResultsPage ';
// import PollResultsPage from '../pages/PollResultsPage '; 

// const ResultTabs = () => {
//   const [activeTab, setActiveTab] = useState('calculateResults');

//   return (
//     <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//       <Row>
//         <Col sm={12}>
//           <Nav variant="tabs" className="mb-3">
//             <Nav.Item>
//               <Nav.Link eventKey="calculateResults">Calculate Results</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="viewResults">View Results</Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col sm={12}>
//           <Tab.Content>
//             <Tab.Pane eventKey="calculateResults">
//               <CalculateResultsPage />
//             </Tab.Pane>
//             <Tab.Pane eventKey="viewResults">
//               <PollResultsPage />
//             </Tab.Pane>
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//   );
// };

// export default ResultTabs;
