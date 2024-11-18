// // Home.js
// import React from 'react';
// import VotersTab from '../pages/VotersTab';
// import electronic from '../asserts/images/electronic.jpg'; // Make sure the image path is correct

// const Vote = () => {
//   return (
//     <div
//       style={{
//         position: 'relative',
//         minHeight: '100vh',
//         overflow: 'hidden',
//         backgroundImage: `url(${electronic})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//       }}
//     >
//       {/* Dark overlay */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for consistency with Poll.js
//           zIndex: 1,
//         }}
//       ></div>

//       {/* Content with white text */}
//       <div style={{ position: 'relative', zIndex: 2, color: 'white', padding: '20px' }}>
//         <h3 className="fst-italic mb-4">Manage Voters</h3>
//         <VotersTab />
//       </div>
//     </div>
//   );
// };

// export default Vote;
