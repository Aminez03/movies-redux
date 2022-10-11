import React from 'react'
import { useDispatch } from 'react-redux'
import { handleDelete } from '../redux/actions'
import EditMovie from './EditMovie'
import StarRating from './StarRating'

function MoviesCard({film}) {
  const dispatch=useDispatch()
  
  return (
    <div className='movieCard'>
        <h1> {film.name}</h1>
        <img src={film.image} alt={film.image} />
        <div className='blaka'>
        <div className='etoile'><StarRating rating={film.rating}/></div>
        
        <p>{film.date}</p>
        <button id='btn' onClick={()=>dispatch(handleDelete(film.id))}>Delete</button>
        <EditMovie movie={film}/>
        


        {/* <Link to={`movie/${film.id}`}>
        <button id='btn'> Details</button></Link> */}
        </div>
        
        
    </div>
    
  )
}

export default MoviesCard