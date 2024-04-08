import { useState, useEffect, useRef } from "react";

function DeleteLake() {
  const deleteLakeRef = useRef();

  const [msg, setMsg] = useState("");
  const [lakes, setLakes] = useState([])

  useEffect(() => {
    if (deleteLakeRef.current) {
      deleteLakeRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
    const fetchLakes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/lake`,
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
          setLakes(data);
        } else {
          setMsg("Erreur lors de la récupération des rôles");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
  fetchLakes();
}, []);

  const submitDeleteLake = async (e) => {
    try {
      e.preventDefault();
      const deleteLake = deleteLakeRef.current.value;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/deleteLake`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lake: deleteLake }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setMsg("Étang supprimé avec succès");
      } else setMsg("Étang non supprimé");
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
    <form onSubmit={submitDeleteLake}>
      <legend>Supprimer un étang</legend>
      <label htmlFor="deleteLake">Nom de l'étang :</label>
      {lakes && lakes.length > 0 && (
        <select ref={deleteLakeRef} id="deleteLake" name="deleteLake">
          {lakes.map((lake, index) => (
            <option key={index} value={lake.Title}>
              {lake.Title}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Supprimer l'étang</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default DeleteLake;
