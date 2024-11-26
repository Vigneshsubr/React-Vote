import React from 'react';

const UsersPerPage = ({ currentUsersPerPage, onUsersPerPageChange }) => {
  const handleChange = (e) => {
    const newUsersPerPage = Number(e.target.value);
    onUsersPerPageChange(newUsersPerPage);
  };

  return (
    <div className="d-flex align-items-center">
      <label htmlFor="usersPerPage" className="form-label text-light me-2 mb-0">
        Users Per Page:
      </label>
      <select
        id="usersPerPage"
        value={currentUsersPerPage}
        onChange={handleChange}
        className="form-select"
        style={{ maxWidth: '100px' }}
      >
        {[10, 20, 30, 40, 50].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UsersPerPage;
