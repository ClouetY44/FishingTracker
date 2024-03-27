import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFish } from "../../../store/slice/fish";

function FishList() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.fish);

  useEffect(() => {
    dispatch(fetchFish());
  }, []);

  console.log(list)
  return (
    <main>
      <h2>Liste des poissons</h2>
      <section>
        {list.map((element) => (
          <article key={element.id}>
            <h3>{element.Title}</h3>
            <img
              src={`http://localhost:9000/img/${element.Src}`}
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
