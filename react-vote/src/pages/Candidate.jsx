import React, { useEffect } from 'react';
import CandidateTab from './CandidateTab';

const Candidate = () => {
  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '20px', // Matches the height of the Header
        overflowX: 'hidden', // Prevent horizontal scrollbars
        backgroundColor: '#f8f9fa', // Light background color
      }}
    >
      {/* Content section */}
      <div style={{ padding: '20px', color: '#343a40' }}>
        <h3 className="fst-italic mb-4">Manage Candidates</h3>
        <CandidateTab />
      </div>
    </div>
  );
};

export default Candidate;
