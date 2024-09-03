import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWater,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import { fetchCatch } from "../../../store/slice/catch";

function CatchList() {
  // Hook pour dispatcher des actions Redux
  const dispatch = useDispatch();
  // Extraction de la liste des prises depuis le state Redux
  const { list } = useSelector((state) => state.catch);
  // Extraction de l'état de connexion de l'utilisateur depuis le state Redux
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    // Effet de chargement initial pour récupérer la liste des prises
    dispatch(fetchCatch());
  }, []);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  }

  // Rendu du composant
  return (
    <main>
      <h2>Liste des prises</h2>
      {isLogged ? (
        <Link to={`/compte/déposer`} className="formCatch">
          Déposer une prise
        </Link>
      ) : null}
      <section>
        {list.map((element) => (
          <article className="cardCatch" key={element.id}>
            <h3>{element.Username}</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <div>
            <p>
              <FontAwesomeIcon
                icon={faWater}
                style={{ color: "#232222" }}
              />
              <span>{element.lake_title}</span>
            </p>
            <p>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#232222" }}
              />
              <span>{formatDate(element.Catch_Date)}</span>
            </p>
            </div>
            <Link to={`/liste-des-prises/${element.id}/detail`}>
              Plus d'infos
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CatchList;
