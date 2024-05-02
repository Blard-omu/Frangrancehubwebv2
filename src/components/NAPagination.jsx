import React, { useState, useEffect } from 'react';
import '../css/paginationM.css'

function NAPagination({ totalItems, itemsPerPage, onPageChange, currentPageCh, setCurrentPageCh }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        // Check if there's a saved current page in localStorage
        const savedPage = localStorage.getItem('currentPageCh');
        if (savedPage) {
          setCurrentPageCh(parseInt(savedPage));
        }
    }, []);

    const handlePageChange = (page) => {
      setCurrentPageCh(page);
        // Save current page to localStorage
        localStorage.setItem('currentPageCh', page);
        onPageChange(page);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPageCh === i ? 'active-m' : ''}>
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

export default NAPagination;
