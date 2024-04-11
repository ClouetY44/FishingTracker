import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const birthdateRef = useRef();
  const emailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();

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
          setUserInfo(infos[0]);
          console.log(userInfo);
        } else {
          setMsg("Erreur lors de la récupération du nombre d'utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUserInfo();
  }, [user.username]);

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  const updateUserHandler = async (e) => {
    try {
      e.preventDefault();
      const birthdate = birthdateRef.current.value;
      const email = emailRef.current.value;
      const datas = { birthdate, email };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/updateInfos?username=${
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
        const updateUser = await response.json();
        console.log(updateUser);
        navigate("/compte");
      } else
        setMsg(
          "Erreur lors de la mise à jour des informations de l'utilisateur"
        );
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };
  console.log(userInfo);

  const changePasswordHandler = async (e) => {
    try {
        e.preventDefault()
        const currentPassword = currentPasswordRef.current.value
        const newPassword = newPasswordRef.current.value
        const datas = {currentPassword,newPassword}
        const response = await fetch (`${import.meta.env.VITE_API_URL}/api/user/changePassword?username=${
            user.username
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
            credentials: "include",
          })
        if (response.ok) {
            const updatedUser = await response.json()
            console.log(updatedUser)
            navigate("/compte")
        } else {
            setMsg("Erreur lors du changement de mot de passe")
        }
    } catch (error) {
        setMsg("Erreur serveur");
      } 
  }

  return (
    <>
      <main>
        <form onSubmit={updateUserHandler}>
          <legend>Modifier vos informations</legend>
          <label htmlFor="birthdate">Date de naissance :</label>
          <input
            type="date"
            id="birthdate"
            ref={birthdateRef}
            defaultValue={formatDate(userInfo?.Birthdate)}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            defaultValue={userInfo?.Email}
          />
          {msg && <p>{msg}</p>}
          <button type="submit">Enregistrer</button>
        </form>


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
          {msg && <p>{msg}</p>}
          <button type="submit">Changer le mot de passe</button>
        </form>
      </main>
    </>
  );
}

export default UpdateInfo;
