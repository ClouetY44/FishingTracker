import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef();
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const inputChangeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  async function submitHandler(e) {
    e.preventDefault()
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify(userInfo)
        })
        if (response.ok) {
          navigate("/connexion")
        } else {
          const data = await response.json()
          setError(data.errorMessage)
        }
    } catch (error) {
        setError("Erreur lors de l'incription")
    }
  } 
  
  return (
    <>
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

            {error && <p>{error}</p>}
        </form>
    </>
);

}

export default Register