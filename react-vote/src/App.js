import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import DashboardLayout from './components/DashboardLayout';
import PollList from './pages/PollList';
import CandidateList from './pages/CandidateList';
import ElectionList from './pages/ElectionList';
import GetVoters from './pages/GetVoters';
import CreateUser from './pages/CreateUser';
import CreateElection from './pages/CreateElection';
import GetCandidates from './pages/GetCandidates';
import CreateCandidate from './pages/CreateCandidate';
import UpdateUser from './pages/UpdateUser';
import UserDetail from './pages/UserDetail';
import Poll from './pages/Poll';
import ElectionDashboard from './pages/ElectionDashboard';
import CalculateResultsPage from './pages/CalculateResultsPage ';
import PollResultsPage from './pages/PollResultsPage ';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['VOTER', 'ADMIN']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="polls/:electionId" element={<PollList />} />
          <Route path="candidates/:pollId/:electionId" element={<CandidateList />} />
          <Route path="elections" element={<ElectionList />} />
          <Route path="pichart" element={<ElectionDashboard />} />
          <Route path="viewresult" element={<PollResultsPage/>}/>
        </Route>

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="voters" element={<GetVoters />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="createelection" element={<CreateElection />} />
          <Route path="getcandidates" element={<GetCandidates />} />
          <Route path="createcandidate" element={<CreateCandidate />} />
          <Route path="updateusers/:id" element={<UpdateUser />} />
          <Route path="userdetails/:id" element={<UserDetail />} />
          <Route path="poll" element={<Poll />} />
          <Route path="calculateresult" element={<CalculateResultsPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
