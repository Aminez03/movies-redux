import axios from "axios";
import {
  GET_ALL_FILMS,
  GET_ALL_FILMS_SUCCESS,
  GET_ALL_FILMS_FAIL,
  GET_FILM_DETAIL,
  GET_FILM_DETAIL_SUCCESS,
  GET_FILM_DETAIL_FAIL,
  ADD_FILM,
  ADD_FILM_SUCCESS,
  ADD_FILM_FAIL,
  DELETE_FILM,
  UPDATE_FILM,
  GET_ALL_CATEGORIES,
  GET_ALL_FILMS_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_FILMS_BY_CATEGORY_SUCCESS,
  GET_FILMS_BY_CATEGORY,
  GET_FILMS_BY_CATEGORY_FAIL,
  GET_ALL_FILMS_PAGINATION,
  GET_ALL_FILMS__PAGINATION_SUCCESS,
  GET_ALL_FILMS__PAGINATION_FAIL,
} from "./actionsTypes";

// Fetch all films
export const getAllFilms = () => async (dispatch) => {
  dispatch({ type: GET_ALL_FILMS });
  try {
    const res = await axios.get("http://localhost:8000/api/films");
    dispatch({ type: GET_ALL_FILMS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ALL_FILMS_FAIL, payload: error.message });
  }
};

//http://localhost:8000/api/films/film/filmspaginate?pageSize=3&page=1

export const getAllFilmsPagination = (currentPage, pageSize) => async (dispatch) => {
  dispatch({ type: GET_ALL_FILMS_PAGINATION });
  try {
    const res = await axios.get(`http://localhost:8000/api/films/film/filmspaginate?pageSize=${pageSize}&page=${currentPage}`);
    dispatch({ type: GET_ALL_FILMS__PAGINATION_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: GET_ALL_FILMS__PAGINATION_FAIL, payload: error.message });
  }
};







// Fetch film details by ID
export const getFilmDetail = (id) => async (dispatch) => {
  dispatch({ type: GET_FILM_DETAIL });
  try {
    const response = await axios.get(`http://localhost:8000/api/films/${id}`);
    dispatch({ type: GET_FILM_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_FILM_DETAIL_FAIL, payload: error.message });
  }
};

// Add a new film
export const addFilm = (newFilm) => async (dispatch) => {
  dispatch({ type: ADD_FILM });
  try {
    const res = await axios.post("http://localhost:8000/api/films", newFilm);
    dispatch({ type: ADD_FILM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ADD_FILM_FAIL, payload: error.response?.data || error.message });
  }
};

// Delete a film by ID
export const deleteFilm = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/api/films/${id}`);
    dispatch({ type: DELETE_FILM, payload: id });
  } catch (error) {
    console.error("Erreur lors de la suppression du film", error);
  }
};

// Update an existing film
export const updateFilm = (film) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/films/${film.id}`, film);
    dispatch({ type: UPDATE_FILM, payload: res.data });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du film", error);
  }
};

// Fetch all films
export const getAllCategorie = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORIES });
  try {
    const res = await axios.get("http://localhost:8000/api/categories");
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_ALL_CATEGORIES_FAIL, payload: error.message });
  }
};
export const createCategory = (category) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY });
  try {
    const res = await axios.post("http://localhost:8000/api/categories", category);
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CREATE_CATEGORY_FAIL, payload: error.message });
  }
};
export const updateCategory = (updatedCategory) => async (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY });
  try {
    const res = await axios.put(`http://localhost:8000/api/categories/${updatedCategory.id}`, updatedCategory);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_CATEGORY_FAIL, payload: error.message });
  }
};
export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY });
  try {
    await axios.delete(`http://localhost:8000/api/categories/${id}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_CATEGORY_FAIL, payload: error.message });
  }
};
export const getCategoryById = (id) => async (dispatch) => {
  dispatch({ type: GET_CATEGORY });
  try {
    const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
    dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_FAIL, payload: error.message });
  }
};
export const getFilmsByCategory = (idcat) => async (dispatch) => {
  dispatch({ type: GET_FILMS_BY_CATEGORY });
  try {
    const res = await axios.get(`http://localhost:8000/api/getfilmlistcat/${idcat}`);
    dispatch({
      type: GET_FILMS_BY_CATEGORY_SUCCESS,
      payload: res.data, // Les films renvoyés par l'API
    });
  } catch (error) {
    dispatch({
      type: GET_FILMS_BY_CATEGORY_FAIL,
      payload: error.message,
    });
  }
};