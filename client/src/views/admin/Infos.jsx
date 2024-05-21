import { useEffect, useState } from "react";

function Infos() {
  // Définition des états pour stocker les données
  const [userCount, setUserCount] = useState(null);
  const [fishCount, setFishCount] = useState(null);
  const [lakeCount, setLakeCount] = useState(null);
  const [catchCount, setCatchCount] = useState(null);
  const [msg, setMsg] = useState("");

  // Effet pour récupérer le nombre d'utilisateurs
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/numberOfUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const count = await response.json();
          setUserCount(count[0].numberOfLines);
        } else {
          setMsg("Erreur lors de la récupération du nombre d'utilisateur");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchUser();
  }, []);

  // Effet pour récupérer le nombre de poissons
  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/numberOfFish`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const count = await response.json();
          setFishCount(count[0].numberOfLines);
        } else {
          setMsg("Erreur lors de la récupération du nombre de poisson");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchFish();
  }, []);

  // Effet pour récupérer le nombre d'étangs
  useEffect(() => {
    const fetchLake = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/numberOfLake`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const count = await response.json();
          setLakeCount(count[0].numberOfLines);
        } else {
          setMsg("Erreur lors de la récupération du nombre d'étang");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchLake();
  }, []);

  // Effet pour récupérer le nombre de prises
  useEffect(() => {
    const fetchCatch = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/numberOfCatch`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const count = await response.json();
          setCatchCount(count[0].numberOfLines);
        } else {
          setMsg("Erreur lors de la récupération du nombre de prises");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchCatch();
  }, []);

  // Rendu du composant avec les statistiques récupérées
  return (
    <>
      {userCount !== null && (
        <p>
          <strong>Nombre d'utilisateurs :</strong> {userCount}
        </p>
      )}
      {fishCount !== null && (
        <p>
          <strong>Nombre de poissons référencés :</strong> {fishCount}
        </p>
      )}
      {lakeCount !== null && (
        <p>
          <strong>Nombre d'étangs référencés :</strong> {lakeCount}
        </p>
      )}
      {catchCount !== null && (
        <p>
          <strong>Nombre de Prises renseignés :</strong> {catchCount}
        </p>
      )}
    </>
  );
}

export default Infos;
