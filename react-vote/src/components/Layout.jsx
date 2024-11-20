// import React from 'react';
// import Header from './Header'; // Dashboard Header
// import SignUpHeader from './SignUpHeader'; // Sign Up Header
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Outlet, useLocation } from 'react-router-dom';

// const Layout = () => {
//   const location = useLocation();

//   // List of routes where the SignUpHeader should be shown
//   const showSignUpHeaderRoutes = ['/signup','/signin','/'];

//   // Check if the current route matches any of the routes for SignUpHeader
//   const showSignUpHeader = showSignUpHeaderRoutes.some(route => location.pathname.includes(route));

//   return (
//     <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
//       {/* Conditionally render the Header based on the current route */}
//       {showSignUpHeader ? <SignUpHeader /> : <Header />}

//       <div className="d-flex" style={{ flexGrow: 1, overflow: 'hidden', marginTop: '80px' }}>
//         {/* Main content */}
//         <main className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
