import { useState, useEffect, useRef } from "react";

function DeleteLake() {
  // Référence pour l'élément de sélection de l'étang à supprimer
  const deleteLakeRef = useRef();

  // État pour afficher les messages
  const [msg, setMsg] = useState("");
  // État pour stocker la liste des étangs
  const [lakes, setLakes] = useState([]);

  // Utilisation de useEffect pour mettre le focus sur l'étang lorsqu'un message est affiché
  useEffect(() => {
    if (deleteLakeRef.current) {
      deleteLakeRef.current.focus();
    }
  }, [msg]);

  // Utilisation de useEffect pour récupérer la liste des étangs depuis l'API au chargement du composant
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
          setMsg("Erreur lors de la récupération des étangs");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchLakes();
  }, []);

  // Fonction pour soumettre la demande de suppression d'un étang
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

  // Utilisation de useEffect pour effacer le message après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 10000);
  });

  // Rendu du composant
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
