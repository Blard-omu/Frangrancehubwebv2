import React, { useState, useEffect } from 'react';
import '../css/paginationM.css'

function Pagination({ totalItems, itemsPerPage, onPageChange, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        // Check if there's a saved current page in localStorage
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(parseInt(savedPage));
        }
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Save current page to localStorage
        localStorage.setItem('currentPage', page);
        onPageChange(page);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active-m' : ''}>
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="pagination-btn">
            {renderPaginationButtons()}
        </div>
    );
}

export default Pagination;
