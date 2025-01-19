import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFilm } from '../redux/actions'; // Utilisation de l'action deleteFilm
import EditMovie from './EditMovie';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { profile } from '../Services/authservice';
import { Button } from 'react-bootstrap';

function MoviesCard({ film }) {
  const dispatch = useDispatch();

  // Fonction pour supprimer un film
  const handleDeleteFilm = () => {
    dispatch(deleteFilm(film.id)); // Appel de l'action deleteFilm avec l'ID du film
  };


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Récupérer le rôle de l'utilisateur depuis le localStorage
    const userRole = localStorage.getItem('role'); // Assurez-vous que le rôle est bien stocké sous 'role'
    
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    setLoading(false);
  }, []); // La dépendance [] garantit que l'effet ne se déclenche qu'une seule fois à l'initialisation

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="movieCard">
      {/* Affichage du titre */}
      <h1>{film.name}</h1>
      
      {/* Image du film */}
      <img src={film.image} alt={film.name} />
      
      <div className="blaka">
        {/* Note sous forme d'étoiles */}
        <div className="etoile">
          <StarRating rating={film.rating} />
        </div>

        {/* Date du film */}
        <p>{film.date}</p>

{/* Vérification du rôle avant de rendre le bouton de suppression */}
      {isAdmin && (
         <button id="btnn" onClick={handleDeleteFilm}>
         Delete
       </button>
      )}

      {/* Vérification du rôle avant de rendre le composant d'édition */}
      {isAdmin && <EditMovie movie={film} />}


        {/* Lien vers les détails du film */}
        <Link to={`movie/${film.id}`}>
          <button id="btnn">Details</button>
        </Link>
      </div>
    </div>
  );
}

export default MoviesCard;
