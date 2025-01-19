
import { combineReducers } from "redux"
import filmsReducer from "./reducerFilm"
import categoryReducer from "./reducerCategorie"
const rootReducers= combineReducers({

    film:filmsReducer,
    category:categoryReducer,
})
export default rootReducers