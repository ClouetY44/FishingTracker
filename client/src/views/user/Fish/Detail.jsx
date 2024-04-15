import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFishDetail } from "../../../store/slice/fish";

function FishDetail() {
  // Récupération de l'ID du poisson depuis les paramètres de l'URL
  const { id } = useParams();

  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection du détail du poisson depuis le state Redux
  const { detail } = useSelector((state) => state.fish);

  // Effet pour charger les détails du poisson à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger les détails du poisson
    dispatch(fetchFishDetail(Number(id)));
  }, [dispatch, Number(id)]);

  // Rendu du composant
  return (
    <main>
      {detail.map((element) => (
        <section key={element.id} className="flexDetail">
          <article className="detail">
            <h2>{element.Title}</h2>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <p>{element.Description}</p>
          </article>
          <article className="detail">
            <h3>Détail du poisson</h3>
            <ul>
              <li>
                <strong>Catégorie:</strong> {element.Label}
              </li>
              <li>
                <strong>Taille moyenne:</strong> {element.Size} cm.
              </li>
              <li>
                <strong>Poids moyen:</strong> {element.Weight} kg.
              </li>
              <li>
                <strong>Saison la plus propice:</strong> {element.Season}
              </li>
              <li>
                <strong>Technique de pêche:</strong> {element.Technical}
              </li>
              <li>
                <strong>Espérance de vie:</strong> {element.Longevity} ans.
              </li>
            </ul>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${
                element.Secondary_src
              }`}
              alt={element.Secondary_alt}
            />
            <Link to={`/liste-des-poissons`}>Retour à la liste</Link>
          </article>
        </section>
      ))}
    </main>
  );
}

export default FishDetail;
