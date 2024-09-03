import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFish } from "../../../store/slice/fish";

function FishList() {
  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection de la liste des poissons depuis le state Redux
  const { list } = useSelector((state) => state.fish);

  const [filter, setFilter] = useState("tout");

  // Effet pour charger la liste des poissons à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger la liste des poissons
    dispatch(fetchFish());
  }, []);

  const getStatus = (status) => {
    const lowerCaseStatus = status.toLowerCase().replace(".", "");
    if (lowerCaseStatus === "poissons blancs") {
      return "Blancs";
    } else if (lowerCaseStatus === "carnassiers") {
      return "Carnassiers";
    } else if (lowerCaseStatus === "carpes") {
      return "Carpes";
    } else if (lowerCaseStatus === "esturgeons") {
      return "Esturgeons";
    }
    return status;
  };

  const filteredList = list.filter((element) => {
    if (filter === "tout") return true;
    return getStatus(element.Label) === filter;
  });

    // Rendu du composant
  return (
    <main>
      <h2>Liste des poissons</h2>
      <div className="filters">
      <button
          onClick={() => setFilter("Carnassiers")}
          className={filter === "Carnassiers" ? "selected" : ""}
        >
          Carnassiers
        </button>
        <button
          onClick={() => setFilter("Blancs")}
          className={filter === "Blancs" ? "selected" : ""}
        >
          Blancs
        </button>
        <button
          onClick={() => setFilter("Carpes")}
          className={filter === "Carpes" ? "selected" : ""}
        >
          Carpes
        </button>
        <button
          onClick={() => setFilter("Esturgeons")}
          className={filter === "Esturgeons" ? "selected" : ""}
        >
          Esturgeons
        </button>
        <button
          onClick={() => setFilter("tout")}
          className={filter === "tout" ? "selected" : ""}
        >
          Tout
        </button>
      </div>
      <section>
        {filteredList.map((element) => (
          <article className="card" key={element.id}>
            <h3>{element.Title}</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <p>{element.Description}</p>
            <Link to={`/liste-des-poissons/${element.id}/detail`}>
              Plus d'infos
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default FishList;
