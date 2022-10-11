import React from 'react'
import { useSelector } from 'react-redux'
import MoviesCard from './MoviesCard'

function MoviesList({data}) {
 
  return (
    <div className='movielist'>
        {React.Children.toArray(data.map(el=><MoviesCard film={el} />))
        }
    </div>
  )
}

export default MoviesList