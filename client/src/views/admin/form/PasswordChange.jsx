import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PasswordChange() {
  const user = useSelector((state) => state.user);
  const [msg, setMsg] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();

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
          setUserInfo(infos[0]);
        } else {
          setMsg("Erreur lors de la récupération des infos utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUserInfo();
  }, [user.username]);

  const changePasswordHandler = async (e) => {
    try {
      e.preventDefault();
      const currentPassword = currentPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const datas = { currentPassword, newPassword };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/changePassword?username=${
          user.username
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
          credentials: "include",
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        navigate("/admin");
      } else {
        const data = await response.json();
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  // Rendu du composant
  return (
    <form onSubmit={changePasswordHandler}>
          <legend>Changer de mot de passe</legend>
          <label htmlFor="currentPassword">Mot de passe actuel :</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            ref={currentPasswordRef}
            required
          />
          <button className="showInput" type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
            {showCurrentPassword ? "Cacher" : "Afficher"} mot de passe
          </button>
          <label htmlFor="newPassword">Nouveau mot de passe :</label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            ref={newPasswordRef}
            required
          />
          <button className="showInput" type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? "Cacher" : "Afficher"} mot de passe
          </button>
          <br />
          <button type="submit">Changer le mot de passe</button>
        </form>
  );
}

export default PasswordChange;
