import React from 'react';
import ElectionTab from '../pages/ElectionTab';
import electronic from '../asserts/images/electronic.jpg'; // Ensure the path is correct

const Election = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '10px', // Matches the height of the fixed header
        overflowX: 'hidden', // Prevent horizontal scrollbars
        backgroundImage: `url(${electronic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for text readability
          
        }}
      ></div>

      {/* Content with white text */}
      <div
        style={{
          position: 'relative',

          color: 'white',
          padding: '20px',
        }}
      >
        <h3 className="fst-italic mb-4">Manage Election</h3>
        <ElectionTab />
      </div>
    </div>
  );
};

export default Election;
