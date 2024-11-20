// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserDetail from './pages/UserDetail';
import UpdateUser from './pages/UpdateUser';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import Vote from './pages/Vote';
import Election from './pages/Election';
import Poll from './pages/Poll';
import Candidate from './pages/Candidate';
import ElectionList from './pages/ElectionList';
import PollList from './pages/PollList';
import CandidateList from './pages/CandidateList';
import Result from './pages/Result';
import GetVoters from './pages/GetVoters';  // Import GetVoters here
import ElectionDashboard from './pages/ElectionDashboard';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        {/* Dashboard Routes with Sidebar (DashboardLayout) */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} /> {/* Optional homepage/dashboard overview */}
          <Route path="vote" element={<Vote />} />
          <Route path="voters" element={<GetVoters />} /> 
          <Route path="updateusers/:id" element={<UpdateUser />} />
          <Route path="userdetails/:id" element={<UserDetail />} />
          <Route path="election" element={<Election />} />
          <Route path="poll" element={<Poll />} />
          <Route path="candidate" element={<Candidate />} />
          <Route path="elections" element={<ElectionList />} />
          <Route path="result" element={<Result />} />
          <Route path="polls/:electionId" element={<PollList />} />
          <Route path="candidates/:pollId/:electionId" element={<CandidateList />} />
          

          {/* Use GetVoters here as a standalone page */}
           {/* The new route for GetVoters */}
           <Route path="/dashboard/userdetails/:id" element={<UserDetail />} />
           <Route path="/dashboard/updateusers/:id" element={<UpdateUser />} />
           <Route path='/dashboard/createuser' element={<CreateUser/>}/>
           <Route path="/dashboard/pichart" element={<ElectionDashboard/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
