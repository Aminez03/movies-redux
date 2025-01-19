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
  GET_FILMS_BY_CATEGORY_FAIL,
  GET_FILMS_BY_CATEGORY_SUCCESS,
  GET_FILMS_BY_CATEGORY,
  GET_ALL_FILMS_PAGINATION,
  GET_ALL_FILMS__PAGINATION_SUCCESS,
  GET_ALL_FILMS__PAGINATION_FAIL,
} from "./actionsTypes";

const initialState = {
  films: [], // Liste des films
  filmDetail: null, 
  loading: false, 
  error: null,
  totalPages: 0,
  currentPage: 1,


};

// Reducer
const filmsReducer = (state = initialState, action) => {

  
    // Récupération de tous les films pagination
  switch (action.type) {
    case GET_ALL_FILMS_PAGINATION:
      return { ...state, loading: true };
    case GET_ALL_FILMS__PAGINATION_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        films: action.payload.films,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case GET_ALL_FILMS__PAGINATION_FAIL:
      return { ...state, loading: false, error: action.payload };




    // Récupération de tous les films
    case GET_ALL_FILMS:
      return { ...state, loading: true, error: null };

    case GET_ALL_FILMS_SUCCESS:
      return { ...state, loading: false, films: action.payload };

    case GET_ALL_FILMS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Récupération des détails d'un film
    case GET_FILM_DETAIL:
      return { ...state, loading: true, error: null };

    case GET_FILM_DETAIL_SUCCESS:
      return { ...state, loading: false, filmDetail: action.payload };

    case GET_FILM_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Ajout d'un film
    case ADD_FILM:
      return { ...state, loading: true, error: null };

    case ADD_FILM_SUCCESS:
      return { ...state, loading: false, films: [...state.films, action.payload] };

    case ADD_FILM_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Suppression d'un film
    case DELETE_FILM:
      return {
        ...state,
        films: state.films.filter((film) => film.id !== action.payload),
      };

    // Mise à jour d'un film
    case UPDATE_FILM:
      return {
        ...state,
        films: state.films.map((film) =>
          film.id === action.payload.id ? action.payload : film
        ),
      };


      case GET_FILMS_BY_CATEGORY:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_FILMS_BY_CATEGORY_SUCCESS:
        return {
          ...state,
          films: action.payload,
          loading: false,
          error: null,
        };
      case GET_FILMS_BY_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };


    // Par défaut, retourne l'état inchangé
    default:
      return state;
  }
};

export default filmsReducer;
