import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.scss';

const PaginationComponent = ({ products, currentPage, totalPages, onPageChange }) => {
  
  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const handlePageChange = (page) => {
    onPageChange(page); 
  };

  return (
    <Pagination className='pagination'>
      <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        {'Previous'}
      </Pagination.Prev>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        {'Next'}
      </Pagination.Next>
    </Pagination>
  );
};

export default PaginationComponent;
