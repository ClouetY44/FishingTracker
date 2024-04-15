import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../store/slice/user";

function Dashboard() {
  // State pour stocker les informations de l'utilisateur
  const [userInfo, setUserInfo] = useState(null);

  // State pour stocker les prises de l'utilisateur
  const [userCatch, setUserCatch] = useState(null);

  // Récupération des informations de l'utilisateur connecté depuis Redux
  const user = useSelector((state) => state.user);

   // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // State pour afficher les messages d'erreur ou de succès
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // Effet pour récupérer les informations de l'utilisateur depuis l'API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/userInfos?username=${
            user.username
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const infos = await response.json();
          setUserInfo(infos);
        } else {
          setMsg("Erreur lors de la récupération des infos utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUserInfo();
  }, []);

  // Effet pour récupérer les prises de l'utilisateur depuis l'API
  useEffect(() => {
    const fetchUserCatch = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/catch?username=${
            user.username
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const userCatch = await response.json();
          setUserCatch(userCatch);
        } else {
          setMsg("Erreur lors de la récupération des prises de l'utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUserCatch();
  }, []);

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      dispatch(logout());
      navigate("/");
    }
  };

  // Fonction pour formater la date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  // Rendu du composant
  return (
    <main>
      <section className="dashboard">
        <h2>Mon compte</h2>
        <button onClick={handleLogout}>Se déconnecter</button>
        <article className="modifs">
          <h3>Informations personnelles</h3>
          {userInfo && userInfo.length > 0 && (
            <>
              {userInfo[0].Username && (
                <p>
                  <strong>Nom d'utilisateur :</strong> {userInfo[0].Username}
                </p>
              )}
              {userInfo[0].Birthdate && (
                <p>
                  <strong>Date de naissance :</strong>{" "}
                  {formatDate(userInfo[0].Birthdate)}
                </p>
              )}
              {userInfo[0].Email && (
                <p>
                  <strong>Email :</strong> {userInfo[0].Email}
                </p>
              )}
              {userInfo[0].CreatedAt && (
                <p>
                  <strong>Compte créé le :</strong>{" "}
                  {formatDate(userInfo[0].CreatedAt)}
                </p>
              )}
              <Link to={`/compte/modification`}>Modifier vos informations</Link>
            </>
          )}
        </article>
        <article className="catch">
          <h3>Mes prises</h3>
          <Link to={`/compte/déposer`} className="formCatch">Déposer une prise</Link>
          {userCatch && userCatch.length > 0 ? (
            userCatch.map((catchItem, index) => (
              <Link
                key={index}
                to={`/liste-des-prises/${catchItem.catch_id}/detail`}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/img/${catchItem.src}`}
                  alt={catchItem.alt}
                />
              </Link>
            ))
          ) : (
            <p className="nothing">Aucune prise à afficher.</p>
          )}
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
