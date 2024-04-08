import { useEffect, useState } from "react";

function Infos() {
  const [userCount, setUserCount] = useState(null);
  const [fishCount, setFishCount] = useState(null);
  const [lakeCount, setLakeCount] = useState(null);
  const [catchCount, setCatchCount] = useState(null);
  const [msg, setMsg] = useState("");

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

  return (
    <>
      {userCount !== null && <p>Nombre d'utilisateurs : {userCount}</p>}
      {fishCount !== null && <p>Nombre de poissons référencés : {fishCount}</p>}
      {lakeCount !== null && <p>Nombre d'étangs référencés : {lakeCount}</p>}
      {catchCount !== null && <p>Nombre de Prises renseignés : {catchCount}</p>}
    </>
  );
}

export default Infos;
