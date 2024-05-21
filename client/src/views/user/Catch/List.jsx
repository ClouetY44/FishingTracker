import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
          <article className="card" key={element.id}>
            <h3>{element.Username}</h3>
            <img
              src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
              alt={element.Alt}
            />
            <p>{element.Description}</p>
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
