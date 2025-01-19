import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducers from "./routeReducer";
import {thunk} from "redux-thunk";

// Configuration de redux-persist
const persistConfig = {
    key: "authType", // Vous pouvez personnaliser la clé ici
    storage: storage,
};

// Appliquez la configuration persistante au reducer
const pReducer = persistReducer(persistConfig, rootReducers);

// Configuration de Redux DevTools (optionnel)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(thunk)) // Applique redux-thunk en tant que middleware
);

const persistor = persistStore(store);

export { persistor, store };
