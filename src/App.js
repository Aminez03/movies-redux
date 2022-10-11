
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import AddNewmovie from './Components/AddNewmovie';
import MoviesList from './Components/MoviesList';
import Navbar from './Components/Navbar'

function App() {
  const list=useSelector(state=>state.list)
  console.log(list)

  const [rating, setRating] = useState(0)
  const [searching, setSearching] = useState("")
  const handleRating=(z)=>setRating(z);
  const handleSearch=(y)=>setSearching(y);
  
  return (
    <div className="App">
    <Navbar searching={searching} rating={rating} handleRating={handleRating} handleSearch={handleSearch}/>
    <MoviesList data={list.filter(el=>el.name.toLocaleLowerCase().includes(searching.toLocaleLowerCase())&& el.rating>=rating)}/>
    <AddNewmovie />
    </div>
  );
}

export default App;
