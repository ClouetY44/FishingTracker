import { useState, useEffect, useRef } from "react";

function DeleteFish() {
  // Référence pour le poisson à supprimer
  const deleteFishRef = useRef();

  // État pour afficher les messages
  const [msg, setMsg] = useState("");
  // État pour stocker la liste des poissons
  const [fishs, setFishes] = useState([]);

  // Utilisation de useEffect pour mettre le focus sur l'élément de sélection de poisson lorsqu'un message est affiché
  useEffect(() => {
    if (deleteFishRef.current) {
      deleteFishRef.current.focus();
    }
  }, [msg]);

  // Utilisation de useEffect pour récupérer la liste des poissons depuis l'API au chargement du composant
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

  // Fonction pour soumettre la demande de suppression d'un poisson
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

  // Utilisation de useEffect pour effacer le message après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 10000);
  });

  // Rendu du composant
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
