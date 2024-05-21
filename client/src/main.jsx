// Import des dépendances nécessaires

// Pour fournir le store Redux à l'application
import { Provider } from "react-redux";

// Pour le routage de l'application
import { BrowserRouter } from "react-router-dom";

// Pour rendre l'application dans le DOM
import ReactDOM from "react-dom/client";

// Le composant principal de l'application
import App from "./App.jsx";

// Fichier SCSS pour les styles de l'application qui sera complié par vite lors du build
import "./assets/css/index.scss"

// Le store Redux à partir du fichier store/index.js
import {store} from "./store/index.js"

// Rendu de l'application dans le DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  // Utilisation du Provider pour fournir le store Redux à l'application
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
