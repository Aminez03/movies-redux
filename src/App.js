import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AddNewmovie from './Components/AddNewmovie';
import MoviesList from './Components/MoviesList';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './Components/Details';
import { getAllFilms } from './redux/actions';
import {getAllFilmsPagination} from './redux/actions';
import Footer from './Components/Footer.jsx';

import Login from './Components/authentification/Login.jsx';
import Logout from './Components/authentification/Logout.jsx';
import Register from './Components/authentification/Register.jsx';
import Dashboard from './Components/admin/Dashboard.jsx';


import ProtectedRoutes from "./ProtectedRoute";
import CategoriesList from './Components/CategoriesList.jsx';
import ContactUs from './Components/ContactUs.jsx';
function App() {

  const [rating, setRating] = useState(0);
  const [searching, setSearching] = useState("");
  const handleRating = (z) => setRating(z);
  const handleSearch = (y) => setSearching(y);
  const dispatch = useDispatch();

 // Accéder aux données du store Redux
 const { films, totalPages, currentPage, loading, error } = useSelector((state) => state.film);
 const [pageSize, setPageSize] = useState(3);
 useEffect(() => {
  dispatch(getAllFilmsPagination(currentPage, pageSize));

}, [dispatch, currentPage,pageSize]);
console.log(films);
  // Gestion de la pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getAllFilmsPagination(currentPage - 1, pageSize));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getAllFilmsPagination(currentPage + 1, pageSize));
    }
  };

  const handlePageChange = (page) => {
    dispatch(getAllFilmsPagination(page, pageSize));
  };

  return (
    <div className="App" style={styles.app}>
      <Router>

        <Navbar 
          searching={searching} 
          rating={rating} 
          handleRating={handleRating} 
          handleSearch={handleSearch} 
        />

        <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/logout" element={<Logout/>}/>

        <Route 
            path="/" 
            element={
              <MoviesList 
                data={films.filter(el =>
                  el.name.toLocaleLowerCase().includes(searching.toLocaleLowerCase()) &&
                  el.rating >= rating
                 
                )} 
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            } 
          />
          <Route path="/add" element={<AddNewmovie />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/CategoriesList" element={<CategoriesList />} />

        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        </Routes>
            <Footer/>
      </Router>
 
    </div>
  );
}
const styles = { app: { display: 'flex', flexDirection: 'column', minHeight: '100vh', }, container: { flex: 1, }, };
export default App;
