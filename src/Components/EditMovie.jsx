import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { handleEdit } from '../redux/actions';
import StarRating from './StarRating';

function EditMovie({movie}) {
  const [name, setName] = useState(movie.name)
  const [image, setImage] = useState(movie.image)
  const [date, setDate] = useState(movie.date)
  const [rating, setRating] = useState(movie.rating)
  const dispatch=useDispatch()
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    const Editmovie={
      id:movie.id,name,image,rating
    };
    dispatch(handleEdit(Editmovie))
    setDate('');
    setImage('');
    setName('');
    setRating('');
    closeModal()
    
  }
  const handleRating=(x)=>setRating(x)
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  }
    Modal.setAppElement('#root');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }

  return (
    <div> 
        
    <button id='btn' onClick={openModal}>Edit </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form  onSubmit={handleSubmit}>
        <label >Movie Title</label>
        <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
        <label >Movie poster</label>
        <input type="text" value={image} onChange={e=>setImage(e.target.value)}/>
        <label >Movie Date</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
        <div className='rating'><StarRating rating={rating} handleRating={handleRating} /></div>
        <div className='btn'>
          <button id='btn' type="submit">Add</button>
          <button id='btn' onClick={closeModal}>Cancel</button>

        </div>

      </form>
    </Modal>
    </div>
  )
}


export default EditMovie