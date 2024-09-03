import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLocationDot, faTags } from "@fortawesome/free-solid-svg-icons";

import { fetchLake } from "../../../store/slice/lake";

function LakeList() {
  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection de la liste des étangs depuis le state Redux
  const { list } = useSelector((state) => state.lake);

  const [filter, setFilter] = useState("tout");

  // Effet pour charger la liste des étangs à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger la liste des étangs
    dispatch(fetchLake());
  }, []);

  const getStatus = (status) => {
    const lowerCaseStatus = status.toLowerCase().replace(".", "");
    if (lowerCaseStatus === "oui") {
      return "privé";
    } else if (lowerCaseStatus === "non") {
      return "public";
    }
    return status;
  };

  const filteredList = list.filter((element) => {
    if (filter === "tout") return true;
    return getStatus(element.Private) === filter;
  });

  // Rendu du composant
  return (
    <main>
      <h2>Liste des étangs</h2>
      <div className="filters">
        <button
          onClick={() => setFilter("privé")}
          className={filter === "privé" ? "selected" : ""}
        >
          Privé
        </button>
        <button
          onClick={() => setFilter("public")}
          className={filter === "public" ? "selected" : ""}
        >
          Public
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
          <article className="cardLake" key={element.id}>
            <h3>{element.Title}</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <div>
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#232222" }}
                />
                <span>{element.Adress}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faTags} style={{ color: "#232222" }} />
                <span>{getStatus(element.Private)}</span>
              </p>
            </div>
            <Link to={`/liste-des-étangs/${element.id}/detail`}>
              Plus d'infos
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default LakeList;
