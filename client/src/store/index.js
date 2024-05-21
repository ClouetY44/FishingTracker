import {configureStore} from '@reduxjs/toolkit';

// Import des slices de réduction
import userReducer from "./slice/user"
import fishReducer from "./slice/fish"
import lakeReducer from "./slice/lake"
import catchReducer from "./slice/catch"
import homeReducer from "./slice/home"

// Configuration du magasin Redux avec les réducteurs combinés
const store = configureStore({
    reducer: {
        // Réducteur pour gérer les données utilisateur
        user: userReducer,

        // Réducteur pour gérer les données de la page d'accueil
        home: homeReducer,

        // Réducteur pour gérer les données des poissons
        fish: fishReducer,

        // Réducteur pour gérer les données des étangs
        lake: lakeReducer,
        
        // Réducteur pour gérer les données des prises
        catch: catchReducer,
    }
})

export {store}