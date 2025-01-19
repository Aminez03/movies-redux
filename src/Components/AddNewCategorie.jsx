import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createCategory } from '../redux/actions'; // Importer l'action Redux
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'; // Importer React-Bootstrap

function AddNewCategorie() {
  const [nomCategorie, setNomCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      nomCategorie,
      description,
    };

    try {
      // Appeler l'action addCategory
      await dispatch(createCategory(newCategory));

      // Afficher un message de succès
      setSuccessMessage('Catégorie ajoutée avec succès !');
      setErrorMessage('');
      
      // Réinitialiser les champs après ajout
      setNomCategorie('');
      setDescription('');
      closeModal();
    } catch (error) {
      // Gérer les erreurs
      setErrorMessage("Erreur lors de l'ajout de la catégorie. Veuillez réessayer.");
      setSuccessMessage('');
    }
  };

  const customStyles = {
    content: {
      marginTop: '100px',
      width: '1000px',
      zIndex: 1050,
      position: 'absolute',
      height: '400px',
    },
  };

  Modal.setAppElement('#root');

  function openModal() {
    setIsOpen(true);
    setSuccessMessage('');
    setErrorMessage('');
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="add-categorie-container">
      <Button variant="warning" onClick={openModal}>
        Nouvelle Catégorie
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal Ajouter une Catégorie"
      >
        <h2 className="text-center mb-4">Ajouter une Nouvelle Catégorie</h2>

        {/* Afficher les messages de succès ou d'erreur */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formNomCategorie">
                  <Form.Label>Nom de la Catégorie</Form.Label>
                  <Form.Control
                    type="text"
                    value={nomCategorie}
                    onChange={(e) => setNomCategorie(e.target.value)}
                    required
                    placeholder="Entrez le nom de la catégorie"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description de la Catégorie</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Entrez la description de la catégorie"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button variant="success" type="submit" block>
                  Ajouter
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="danger" onClick={closeModal} type="button" block>
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

export default AddNewCategorie;
