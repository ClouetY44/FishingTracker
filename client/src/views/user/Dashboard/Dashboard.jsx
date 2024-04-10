import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../store/slice/user";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(user);
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
          console.log(infos);
        } else {
          setMsg("Erreur lors de la récupération du nombre d'utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUserInfo();
  }, []);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  return (
    <main>
      <section className="dashboard">
        <h2>Mon compte</h2>
        <button onClick={handleLogout}>Se déconnecter</button>
        <article>
          {userInfo && userInfo.length > 0 && (
            <>
              <p>
                <strong>Nom d'utilisateur :</strong> {userInfo[0].Username}
              </p>
              <p>
                <strong>Date de naissance :</strong> {formatDate(userInfo[0].Birthdate)}
              </p>
              <p>
                <strong>Email :</strong> {userInfo[0].Email}
              </p>
              <p>
                <strong>Compte créé le :</strong> {formatDate(userInfo[0].CreatedAt)}
              </p>
              <Link to={`/compte/modification`}>Modifier vos informations</Link>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
