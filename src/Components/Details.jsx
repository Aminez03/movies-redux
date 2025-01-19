import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmDetail } from '../redux/actions'; // Importer l'action
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Details = () => {
  const { id } = useParams(); // Récupérer l'ID des paramètres d'URL
  const dispatch = useDispatch();

  // Accéder aux données du film et à l'état de chargement/erreur
  const { filmDetail, loading, error } = useSelector((state) => state.film);

  console.log(filmDetail);

  useEffect(() => {
    // Appeler l'action pour récupérer les détails du film
    dispatch(getFilmDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Chargement...</p>;
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
        Erreur : {error}
      </p>
    );
  }

  if (!filmDetail) {
    return (
      <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
        Film introuvable
      </p>
    );
  }

  return (
    <div className="details">
    <Link to="/" className="backButton">
      <FontAwesomeIcon icon={faArrowLeft} className="icon" /> Retour
    </Link>
    <img
      className="imageDetails"
      src={filmDetail.image}
      alt={filmDetail.name}
    />
    <h1 className="namedetails">{filmDetail.name}</h1>
    <h4 className="decDetails">{filmDetail.description}</h4>
    <div className="trailerDetails">
      <iframe
        width="560"
        height="315"
        src={filmDetail.trailer}
        title={filmDetail.name}
        allowFullScreen
      ></iframe>
    </div>
  </div>
  
  );
};
export default Details;
