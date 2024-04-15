import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFish } from "../../../store/slice/fish";

function FishList() {
  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection de la liste des poissons depuis le state Redux
  const { list } = useSelector((state) => state.fish);

  // Effet pour charger la liste des poissons à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger la liste des poissons
    dispatch(fetchFish());
  }, []);

    // Rendu du composant
  return (
    <main>
      <h2>Liste des poissons</h2>
      <section>
        {list.map((element) => (
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
