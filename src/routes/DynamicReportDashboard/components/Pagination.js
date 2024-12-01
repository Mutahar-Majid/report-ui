import React from "react";

// Pagination Component
const Pagination = ({ 
  totalRows, 
  pageSize, 
  currentPage, 
  onPageSizeChange, 
  onPageChange 
}) => {
  const pageSizeOptions = [20, 50, 100, 1000, 'All'];
  const totalPages = pageSize === 'All' 
    ? 1 
    : Math.ceil(totalRows / parseInt(pageSize));

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-b-lg">
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select 
          value={pageSize.toString()} 
          onChange={(e) => onPageSizeChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option.toString()}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {pageSize !== 'All' && (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;