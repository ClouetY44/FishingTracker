import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // Référence pour le champ de nom d'utilisateur
  const usernameRef = useRef();

  // État pour stocker les informations de l'utilisateur (nom d'utilisateur et mot de passe)
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  // État pour gérer les erreurs lors de l'inscription
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Effet pour permettre le changement de focus sur le champ de nom d'utilisateur
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Fonction pour mettre à jour l'état userInfo lorsqu'un champ est modifié
  const inputChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction de soumission du formulaire d'inscription
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      // Si l'inscription réussit, l'utilisateur est redirigé vers la page de connexion
      if (response.ok) {
        navigate("/connexion");
      } else {
        const data = await response.json();
        setError(data.errorMessage);
      }
    } catch (error) {
      setError("Erreur lors de l'incription");
    }
  }

  // Rendu du composant
  return (
    <>
      <main>
        <form onSubmit={submitHandler}>
          <legend>Création de compte</legend>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            onChange={inputChangeHandler}
          />

          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={inputChangeHandler}
          />

          <button type="submit">Créer le compte</button>
          <Link to={"/connexion"}>Déja un compte ?</Link>
          {error && <p>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default Register;
