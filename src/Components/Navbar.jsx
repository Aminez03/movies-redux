import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategorie, getFilmsByCategory } from '../redux/actions';
import Search from './Search';
import AddNewmovie from './AddNewmovie';
import { Form } from 'react-bootstrap';
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ searching, rating, handleRating, handleSearch }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [CC_Token, setCC_Token] = useState(null);

  useEffect(() => {
    const storedCC_Token = localStorage.getItem("CC_Token");
    if (storedCC_Token) setCC_Token(storedCC_Token);
    dispatch(getAllCategorie());
  }, [dispatch, CC_Token]);
  
  const handleCategorieChange = (event) => {
    const idcat = event.target.value;
    setSelectedCategorie(idcat);
    dispatch(getFilmsByCategory(idcat));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-light p-3  fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-warning fw-bold" to="/">
          MyMovies
        </Link>
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-flex align-items-center me-auto">
            <Form.Select
              id="categorie-select"
              className="form-select bg-dark text-light border-warning custom-select"
              value={selectedCategorie}
              onChange={handleCategorieChange}
            >
              <option value="">Catégories :</option>
              {categories.length > 0 ? (
                categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nomCategorie}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Chargement...
                </option>
              )}
            </Form.Select>
            <Search
              searching={searching}
              rating={rating}
              handleRating={handleRating}
              handleSearch={handleSearch}
            />
          </div>

          <div className="d-flex align-items-center ms-auto">
            {CC_Token ? (
              <>
                <Link to="/Dashboard" className="nav-link text-light mx-4">
                  <FaUserCircle className="icon" /> Dashboard
                </Link>
                <Link to="/logout" className="nav-link text-light mx-4">
                  <FaSignOutAlt className="icon" /> Déconnexion
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-light mx-2">
                  <FaSignInAlt className="icon" /> Connexion
                </Link>
                <Link to="/register" className="nav-link text-light mx-2">
                  <FaUserPlus className="icon" /> Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
