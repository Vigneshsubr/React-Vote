import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  usersPerPage,
  onUsersPerPageChange,
}) => (
  <div className="d-flex justify-content-between align-items-center mt-3">
    <div className="d-flex align-items-center">
      <label htmlFor="usersPerPage" className="form-label text-light me-2 mb-0">
        Users Per Page:
      </label>
      <select
        id="usersPerPage"
        value={usersPerPage}
        onChange={onUsersPerPageChange}
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
    <div>
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="btn btn-primary mx-1"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`btn mx-1 ${currentPage === pageNumber ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="btn btn-primary mx-1"
      >
        Next
      </button>
    </div>
  </div>
);

export default Pagination;
