// src/components/Pagination.js
import React from 'react';
import './Pagination.css';  // Ensure the CSS is imported correctly

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, totalPages }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
