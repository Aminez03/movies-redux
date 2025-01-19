import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addFilm, getAllCategorie } from '../redux/actions';
import StarRating from './StarRating';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function AddNewMovie() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [trailer, setTrailer] = useState('');
  const [categorieID, setCategorieID] = useState('');

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategorie());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFilm = {
      name,
      image,
      date,
      rating,
      description,
      trailer,
      categorieID,
    };

    await dispatch(addFilm(newFilm));

    setName('');
    setImage('');
    setDate('');
    setRating(0);
    setDescription('');
    setTrailer('');
    setCategorieID('');
    closeModal();
  };

  const handleRating = (x) => setRating(x);

  const customStyles = {
    content: {
      marginTop: '100px',
      width: '1000px',
      zIndex: 1050,
      position: 'absolute',
    },
  };

  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="add-movie-container">
      <Button variant="warning" onClick={openModal}>
        Nouveau Film
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal Ajouter un Film"
      >
        <h2 className="text-center mb-4">Ajouter un Nouveau Film</h2>

        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formName">
                  <Form.Label>Titre du Film</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Entrez le titre du film"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formImage">
                  <Form.Label>Affiche du Film (URL de l'image)</Form.Label>
                  <Form.Control
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    placeholder="Entrez l'URL de l'image"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formDate">
                  <Form.Label>Date de Sortie</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description du Film</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Entrez la description du film"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formTrailer">
                  <Form.Label>Lien de la Bande-Annonce (YouTube ou autres plateformes)</Form.Label>
                  <Form.Control
                    type="text"
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                    placeholder="Entrez le lien de la bande-annonce"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formCategoryID">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Select
                    value={categorieID}
                    onChange={(e) => setCategorieID(e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez une Catégorie</option>
                    {categories.length > 0 ? (
                      categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.nomCategorie}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        Chargement des catégories...
                      </option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="rating">
                  <Form.Label>Évaluation</Form.Label>
                  <StarRating rating={rating} handleRating={handleRating} />
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Button variant="success" type="submit" className="w-100">
                  Ajouter
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="danger" onClick={closeModal} type="button" className="w-100">
                  Annuler
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal>
    </div>
  );
}

export default AddNewMovie;
