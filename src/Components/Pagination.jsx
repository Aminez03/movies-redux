import React from 'react';
import './Pagination.css';

const Pagination = ({
  handlePrevPage,
  handleNextPage,
  handlePageChange,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="pagination">
      {/* Previous button */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="pagination-button prev"
      >
        &laquo; Previous
      </button>

      {/* Page numbers */}
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button next"
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
