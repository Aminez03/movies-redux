import {
    GET_ALL_CATEGORIES,
GET_ALL_CATEGORIES_SUCCESS,
 GET_ALL_CATEGORIES_FAIL,

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
  } from "./actionsTypes";
  
  const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_CATEGORIES:
      case CREATE_CATEGORY:
      case UPDATE_CATEGORY:
      case DELETE_CATEGORY:
      case GET_CATEGORY:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          loading: false,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: [...state.categories, action.payload],
          loading: false,
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: state.categories.map((cat) =>
            cat.id === action.payload.id ? action.payload : cat
          ),
          loading: false,
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: state.categories.filter((cat) => cat.id !== action.payload),
          loading: false,
        };
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          category: action.payload,
          loading: false,
        };
      case GET_ALL_CATEGORIES_FAIL:
      case CREATE_CATEGORY_FAIL:
      case UPDATE_CATEGORY_FAIL:
      case DELETE_CATEGORY_FAIL:
      case GET_CATEGORY_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  

