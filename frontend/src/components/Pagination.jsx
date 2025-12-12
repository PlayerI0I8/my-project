import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>◀ ก่อนหน้า</button>
            <span className="page-info">หน้า {currentPage} / {totalPages}</span>
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>ถัดไป ▶</button>
        </div>
    );
};

export default Pagination;