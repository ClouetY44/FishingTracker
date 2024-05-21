import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchLakeDetail } from "../../../store/slice/lake";

function DetailLake() {
  // Récupération de l'ID de l'étang depuis les paramètres de l'URL
  const { id } = useParams();

  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection des détails de l'étang depuis le state Redux
  const { detail } = useSelector((state) => state.lake);

  // Effet pour charger les détails de l'étang à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger les détails de l'étang avec l'ID spécifié
    dispatch(fetchLakeDetail(Number(id)));
  }, [dispatch, Number(id)]);

  // Rendu du composant
  return (
    <main>
      {detail.map((element) => (
        <section key={element.id} className="flexDetail">
          <article className="detail">
            <h2>{element.Title}</h2>
              <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Secondary_src}`}
              alt={element.Secondary_alt}
            />
            <p>{element.Description}</p>
          </article>
          <article className="detail">
            <h3>Détail de l'étang</h3>
            <ul>
            <li>
                <strong>Adresse:</strong> {element.Adress}
              </li>
              <li>
                <strong>Superficie:</strong> {element.Surface} hectars.
              </li>
              <li>
                <strong>Privé:</strong> {element.Private}.
              </li>
              <li>
                <strong>Périodes de pêche:</strong> {element.Period}
              </li>
              <li>
                <strong>Nombre de cannes autorisé:</strong> {element.Number_rods}.
              </li>
              <li>
                <strong>Pêche de nuit:</strong> {element.Night}.
              </li>
              <li>
                <strong>Leurres:</strong> {element.Lure}.
              </li>
              <li>
                <strong>Carte de pêche:</strong> {element.Card}
              </li>
              <li>
                <strong>Prix à la journée:</strong> {element.Day_price} euros.
              </li>
              <li>
                <strong>Prix à l'année:</strong> {element.Year_price} euros.
              </li>
            </ul>
            <Link to={`/liste-des-étangs`}>
              Retour à la liste
            </Link>
          </article>
        </section>
      ))}
    </main>
  );
}

export default DetailLake