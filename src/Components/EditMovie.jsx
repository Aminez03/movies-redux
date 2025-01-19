import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilm, getAllCategorie } from '../redux/actions';
import StarRating from './StarRating';

function EditMovie({ movie }) {
  const [name, setName] = useState(movie.name);
  const [image, setImage] = useState(movie.image);
  const [description, setDescription] = useState(movie.description);
  const [date, setDate] = useState(movie.date);
  const [rating, setRating] = useState(movie.rating);
  const [trailer, setTrailer] = useState(movie.trailer || '');
  const [categoryID, setCategoryID] = useState(movie.categorieID || '');
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategorie());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      id: movie.id,
      name,
      image,
      description,
      date,
      rating,
      trailer,
      categoryID,
    };

    dispatch(updateFilm(updatedMovie));
    closeModal();
  };

  const handleRating = (x) => setRating(x);

  const customStyles = {
    content: {
      marginTop:"100px",
      width: "1000px",
      marginLight:"00px",
  
    },
  };

  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button id="btnn" onClick={openModal}>
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Movie Modal"
      >
        <form onSubmit={handleSubmit}>
          <label>Movie Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Movie Poster</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Movie Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Movie Trailer Link</label>
          <input
            type="text"
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
          />

          <label>Category</label>
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.nomCategorie}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading categories...
              </option>
            )}
          </select>

          <div className="rating">
            <StarRating rating={rating} handleRating={handleRating} />
          </div>

          <div className="btn">
            <button id="btn" type="submit">
              Save
            </button>
            <button id="btn" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditMovie;
