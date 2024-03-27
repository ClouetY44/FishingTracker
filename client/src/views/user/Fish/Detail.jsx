import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchFishDetail } from "../../../store/slice/fish";

function FishDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.fish);

  useEffect(() => {
    dispatch(fetchFishDetail(Number(id)));
  }, [dispatch, (Number(id))]);
  console.log(detail.id)
  return (
    <main>
      {detail.map((element) => (  
        <section key={element.id}>
          <article>
          <h2>{element.Title}</h2>
          <img
              src={`http://localhost:9000/img/${element.Src}`}
              alt={element.Alt}
            />
          <p>{element.Description}</p>
          </article>
        </section>
      ))}
      <h2>Détail du poisson</h2>
      <h3>{detail.id}</h3>
    </main>
  );
}

export default FishDetail;