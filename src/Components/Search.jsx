
import StarRating from './StarRating'

const Search = ({searching,rating,handleRating,handleSearch}) => {
  
  return (
    <div>
        <form className='search'>
            <label className='Search1'> Search:</label>
            <div className='Search2'><input type="text" value={searching} onChange={e=>handleSearch(e.target.value)} />
            <StarRating rating={rating} handleRating={handleRating} /></div>
        </form>

    </div>
  )
}

export default Search