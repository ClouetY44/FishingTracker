import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Composant pour supprimer un utilisateur
import DeleteUser from "./form/DeleteUser";
// Composant pour mettre à jour le rôle d'un utilisateur
import UpdateRole from "./form/UpdateRole";
// Composant pour supprimer un étang
import DeleteLake from "./form/DeleteLake";
// Composant pour supprimer un poisson
import DeleteFish from "./form/DeleteFish";
// Composant pour afficher des informations générales
import Infos from "./Infos";

import PasswordChange from "./form/PasswordChange";

// Action Redux pour la déconnexion de l'utilisateur
import { logout } from "../../store/slice/user";

function BackOffice() {
  // Initialisation du dispatcher Redux
  const dispatch = useDispatch();
  // Initialisation de la fonction de navigation
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      // Déclenche l'action Redux pour déconnecter l'utilisateur
      dispatch(logout());
      // Redirige l'utilisateur vers la page d'accueil après déconnexion
      navigate("/");
    }
  };

  // Rendu du composant
  return (
    <main>
      <section className="adminPanel">
        <h2>Panneau Administrateur</h2>
        <button onClick={handleLogout}>Se déconnecter</button>
        <article>
          <Infos />
        </article>
        <PasswordChange />
        <UpdateRole />
        <DeleteLake />
        <DeleteUser />
        <DeleteFish />
      </section>
    </main>
  );
}

export default BackOffice;
