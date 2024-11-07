import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
// import GetVoters from './pages/GetVoters';
// import CreateUser from './pages/CreateUser';
import UserDetail from './pages/UserDetail';
import UpdateUser from './pages/UpdateUser';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
// import VotersTab from './pages/VotersTab';
import Vote from './pages/Vote';
//import CreateElection from './pages/CreateElection';
import Election from './pages/Election';
import Poll from './pages/Poll';
import Candidate from './pages/Candidate';

// Import the new components for election workflow
import ElectionList from './pages/ElectionList';  // List all elections
import PollList from './pages/PollList';          // List polls under an election
import CandidateList from './pages/CandidateList'; // List candidates under a poll
import VoteForm from './pages/VoteForm';




function App() {
  return (
    <Router>
      <Routes>
        {/* Layout with Header (Navbar) included */}
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Route>

        {/* Dashboard Layout with the VotersTab */}
        <Route path='dashboard' element={<DashboardLayout />}>
          {/* Voters page shows the VotersTab below the Navbar */}
          <Route path='vote' element={<Vote />} />
          <Route path="updateusers/:id" element={<UpdateUser />} />
          <Route path="userdetails/:id" element={<UserDetail />} />
        </Route>

        <Route path='dashboard' element={<DashboardLayout />}>
          {/* Voters page shows the VotersTab below the Navbar */}
          <Route path='election' element={<Election />} />
        </Route>

        <Route path='dashboard' element={<DashboardLayout />}>
          {/* Voters page shows the VotersTab below the Navbar */}
          <Route path='poll' element={<Poll />} />
        </Route>

        <Route path='dashboard' element={<DashboardLayout />}>
          {/* Voters page shows the VotersTab below the Navbar */}
          <Route path='candidate' element={<Candidate />} />
        </Route>

         {/* Election Workflow */}
         <Route path='dashboard/elections' element={<DashboardLayout />}>
          <Route index element={<ElectionList />} />
          <Route path=":electionId/polls" element={<PollList />} />
          <Route path="poll/:pollId/candidates" element={<CandidateList />} />
          
        </Route>


        {/* <Route path="create-election" element={<CreateElection />} /> */}
        <Route path="/elections/:electionId/vote" element={<VoteForm />} />
        <Route path="/polls/:electionId" element={<PollList />} />
        <Route path="/candidates/:pollId/:electionId" element={<CandidateList />} />
       
      </Routes>
    </Router>
  );
}

export default App;
