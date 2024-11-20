
import React from 'react';
import ResultTabs from '../pages/ResultTabs';
import electronic from '../asserts/images/electronic.jpg'; 

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
      
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
     
        }}
      ></div>

      <div style={{ position: 'relative', color: 'white', padding: '20px' }}>
        <h3 className="fst-italic mb-4">Manage Results</h3>
        <ResultTabs />
      </div>
    </div>
  );
};

export default Result;
