import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <div className="d-flex" style={{ flexGrow: 1, overflow: 'hidden',marginTop: '80px' }}> 
        <Sidebar />
        <main className="flex-grow-1 p-3" style={{ overflowY: 'auto', marginLeft: '250px' }}> 
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
