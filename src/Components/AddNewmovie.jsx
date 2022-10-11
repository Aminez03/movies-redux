import React, { useState } from 'react'
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { handleAdd } from '../redux/actions';
import StarRating from './StarRating';

function AddNewmovie() {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [date, setDate] = useState("")
  const [rating, setRating] = useState("")
  const dispatch=useDispatch()
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    const TheNewMovi={
      id:Math.random(),name,image,rating
    };
    dispatch(handleAdd(TheNewMovi))
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
    <button  id='btnnew' onClick={openModal}>New movie</button>
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


export default AddNewmovie