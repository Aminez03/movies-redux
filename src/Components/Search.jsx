
import StarRating from './StarRating'

const Search = ({searching,rating,handleRating,handleSearch}) => {
  
  return (
    <div>
        <form className='search'>
            <label className='SearchTitle'> Rechercher:</label>
            <div className='SearchInput'><input type="text" value={searching} onChange={e=>handleSearch(e.target.value)} />
            <StarRating rating={rating} handleRating={handleRating} /></div>
        </form>

    </div>
  )
}

export default Search