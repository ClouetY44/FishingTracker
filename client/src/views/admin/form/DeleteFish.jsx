import { useState, useEffect, useRef } from "react";

function DeleteFish() {
  const deleteFishRef = useRef();

  const [msg, setMsg] = useState("");
  const [fishs, setFishes] = useState([])

  useEffect(() => {
    if (deleteFishRef.current) {
      deleteFishRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
    const fetchFishs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/fish`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFishes(data);
        } else {
          setMsg("Erreur lors de la récupération des poissons");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
  fetchFishs();
}, []);

  const submitDeleteFish = async (e) => {
    try {
      e.preventDefault();
      const deleteFish = deleteFishRef.current.value;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/deleteFish`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fish: deleteFish }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setMsg("Poisson supprimé avec succès");
      } else setMsg("Poisson non supprimé");
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 10000);
  });

  return (
    <form onSubmit={submitDeleteFish}>
      <legend>Supprimer un poisson</legend>
      <label htmlFor="deleteFish">Nom du poisson :</label>
      {fishs && fishs.length > 0 && (
        <select ref={deleteFishRef} id="deleteFish" name="deleteFish">
          {fishs.map((fish, index) => (
            <option key={index} value={fish.Title}>
              {fish.Title}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Supprimer le poisson</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default DeleteFish;
