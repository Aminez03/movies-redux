import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Details = ({list}) => {
    const {id}=useParams();
    
    const item=list.find(el=>el.id==id);
    useEffect(()=>{},[id])
    
  return (
    <div className='details'>
    <img className='imageDetails'  src={item.image} alt={item.name} />
      <h1 className='namedetails'>{item.name}</h1>
       <h4 className='decDetails'>{item.description}</h4>
       <div className='trailerDetails'><iframe width="300px" height="300px" src={item.trailer} title={item.name} allowfullscreen></iframe></div>
     

    </div>
  )
}

export default Details