import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCatchDetail } from "../../../store/slice/catch.js";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

function DetailCatch() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.catch);

  useEffect(() => {
    dispatch(fetchCatchDetail(Number(id)));
  }, [dispatch, Number(id)]);
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
              <li>
                <strong>Étang:</strong> {element.Title}.
              </li>
              <li>
                <strong>Date:</strong> {formatDate(element.Catch_Date)}
              </li>
              <li>
                <strong>Poisson:</strong> {element.Fish}.
              </li>
              <li>
                <strong>Taille:</strong> {element.Length} cm.
              </li>
              <li>
                <strong>Poids:</strong> {element.Weight} kg.
              </li>
              <li>
                <strong>Technique de pêche:</strong> {element.Method}.
              </li>
              <li>
                <strong>Météo:</strong> {element.Weather}
              </li>
              <li>
                <strong>Remis à l'eau:</strong> {element.Released}.
              </li>
            </ul>
            <Link to={`/liste-des-prises`}>Retour à la liste</Link>
          </article>
        </section>
      ))}
    </main>
  );
}

export default DetailCatch;
