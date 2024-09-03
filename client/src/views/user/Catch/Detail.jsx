import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCatchDetail } from "../../../store/slice/catch.js";

// Fonction utilitaire pour formater la date
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

function DetailCatch() {
  // Récupération de l'ID de la prise dans les paramètres de l'URL
  const { id } = useParams();
  // Dispatch des actions Redux
  const dispatch = useDispatch();
  // Extraction du détail de la prise depuis le state Redux
  const { detail } = useSelector((state) => state.catch);

  // Effet de chargement des détails de la prise lors du chargement du composant
  useEffect(() => {
    dispatch(fetchCatchDetail(Number(id)));
  }, [dispatch, Number(id)]);

  // Rendu du composant
  return (
    <main>
      {detail.map((element) => (
        <section key={element.id} className="flexDetail">
          <article className="detail">
            <h2>{element.Username}</h2>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <p>{element.Description}</p>
          </article>
          <article className="detail">
            <h3>Détail de la prise</h3>
            <ul>
              {element.Title && (
                <li>
                  <strong>Étang:</strong> {element.Title}.
                </li>
              )}
              {element.Catch_Date && (
                <li>
                  <strong>Date:</strong> {formatDate(element.Catch_Date)}
                </li>
              )}
              {element.Fish && (
                <li>
                  <strong>Poisson:</strong> {element.Fish}.
                </li>
              )}
              {element.Length && element.Length > 0 && (
                <li>
                  <strong>Taille:</strong> {element.Length} cm.
                </li>
              )}
              {element.Weight && element.Weight > 0 && (
                <li>
                  <strong>Poids:</strong> {element.Weight} kg.
                </li>
              )}
              {element.Method && (
                <li>
                  <strong>Technique de pêche:</strong> {element.Method}.
                </li>
              )}
              {element.Weather && (
                <li>
                  <strong>Météo:</strong> {element.Weather}
                </li>
              )}
              {element.Released && (
                <li>
                  <strong>Remis à l'eau:</strong> {element.Released}.
                </li>
              )}
            </ul>
          </article>
        </section>
      ))}
    </main>
  );
}

export default DetailCatch;
