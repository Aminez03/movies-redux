import React from 'react'

import Search from './Search'

const Navbar = ({searching,rating,handleRating,handleSearch}) => {
  return (
    <div className='navbar'>
        <Search searching={searching} rating={rating} handleRating={handleRating} handleSearch={handleSearch} />
        
    </div>
  )
}

export default Navbar