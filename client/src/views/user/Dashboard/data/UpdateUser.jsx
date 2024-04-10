import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const birthdateRef = useRef();
  const emailRef = useRef();

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

  const submitHandler = async (e) => {
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
  return (
    <>
      <main>
        <form onSubmit={submitHandler}>
          <legend>Modifier vos informations</legend>
          <label htmlFor="birthdate">Date de naissance :</label>
          <input
            type="date"
            id="birthdate"
            ref={birthdateRef}
            defaultValue={formatDate(userInfo?.Birthdate)}
          />
          <br />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            defaultValue={userInfo?.Email}
          />
          <br />
          {msg && <p>{msg}</p>}
          <button type="submit">Enregistrer</button>
        </form>
      </main>
    </>
  );
}

export default UpdateInfo;
