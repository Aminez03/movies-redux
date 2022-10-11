import React from 'react'





function StarRating({rating ,handleRating}) {

    const starts=(rating)=>{
        let tab=[]
        for (let i = 0; i < 5; i++) {
         if(i<=rating){
            tab.push(<span style={{color:"gold"}} onClick={()=>handleRating(i)} ><i class="fa-solid fa-star"></i></span>)
            
         }else{
                tab.push(<span style={{color:"black"}} onClick={()=>handleRating(i)} ><i class="fa-solid fa-star"></i></span>)
            }
        }
    return tab  
    }
  return (
    <div>
    {React.Children.toArray(starts(rating))}
    </div>
  )
}
export default StarRating