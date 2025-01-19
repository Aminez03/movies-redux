import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory, getAllCategorie } from '../redux/actions';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

function EditCategorie({ categorie }) {
  const [nomCategorie, setNomCategorie] = useState(categorie.nomCategorie);
  const [description, setDescription] = useState(categorie.description);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategorie());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategorie = {
      id: categorie.id,
      nomCategorie,
      description,
    };

    dispatch(updateCategory(updatedCategorie));
    closeModal();
  };

  const customStyles = {
    content: {
      marginTop: "100px",
      width: "1000px",
      height:"400px",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
     <button className="btn btn-warning" onClick={openModal}>
    Modifier
</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Category Modal"
      >
        <form onSubmit={handleSubmit}>
          <label>Category Name</label>
          <input
            type="text"
            value={nomCategorie}
            onChange={(e) => setNomCategorie(e.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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

export default EditCategorie;
