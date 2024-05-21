import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/slice/user";

function Login() {
  // Initialisation des références et états
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [msg, setMsg] = useState("");

  // Effet pour définir le focus sur le champ de nom d'utilisateur
  useEffect(() => {
    usernameRef.current.focus();
  }, [msg]);

  // Fonction de soumission du formulaire de connexion
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const datas = { username, password };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
          credentials: "include",
        }
      );
      if (response.ok) {
        // Si la connexion réussit, l'utilisateur est redirigé vers la page d'accueil
        // et ses informations sont stockées dans le store Redux
        const user = await response.json();
        dispatch(login({ username: user.username, role: user.role }));
        navigate("/");
      } else setMsg("Nom d'utilisateur ou mot de passe incorrect");
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  // Rendu du composant
  return (
    <>
      <main>
        <form onSubmit={submitHandler}>
          <legend>Connexion</legend>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            placeholder="Votre nom d'utilisateur"
          />

          <label htmlFor="password">Mot de passe :</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
          />

          <button type="submit">Valider</button>
          <Link to={"/inscription"}>Créer un compte</Link>
          {msg && <p>{msg}</p>}
        </form>
      </main>
    </>
  );
}

export default Login;
