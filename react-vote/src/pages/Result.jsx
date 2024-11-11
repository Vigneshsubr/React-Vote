// Result.js
import React from 'react';
import ResultTabs from '../pages/ResultTabs';
import electronic from '../asserts/images/electronic.jpg'; // Ensure the image path is correct

const Result = () => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${electronic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for a consistent look
          zIndex: 1,
        }}
      ></div>

      {/* Content area */}
      <div style={{ position: 'relative', zIndex: 2, color: 'white', padding: '20px' }}>
        <h3 className="fst-italic mb-4">Manage Results</h3>
        <ResultTabs />
      </div>
    </div>
  );
};

export default Result;
