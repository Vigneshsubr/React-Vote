import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';
import GetVoters from './pages/GetVoters';
import CreateUser from './pages/CreateUser';
import UserDetail from './pages/UserDetail';
import UpdateUser from './pages/UpdateUser';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import VotersTab from './pages/VotersTab';
import Vote from './pages/Vote';

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
      </Routes>
    </Router>
  );
}

export default App;
