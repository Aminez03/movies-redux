import React from 'react';

import MoviesCard from './MoviesCard';
import Pagination from './Pagination';
import ContactUs from './ContactUs';

function MoviesList({ data, totalPages, currentPage, handlePrevPage, handleNextPage, handlePageChange }) {
  return (
    <>
    <div className="movies-list-container">
      <h1 className="movies-list-title">Liste des Films</h1>
      <div className="movielist">
        {React.Children.toArray(
          data.map((el) => <MoviesCard film={el} />)
        )}
      </div>

      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
         
    </div>
     <ContactUs/>
    </>
  );
}

export default MoviesList;
