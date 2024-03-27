import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCatch } from "../../../store/slice/catch";

function CatchList(){
    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.catch)
    
    useEffect(() => {
        dispatch(fetchCatch())
    }, [])
    

    return (
        <main>
            <h2>Liste des prises</h2>
            <section>
            {list.map((element) =>(
                <article key={element.id}>
                    <h3>{element.Username}</h3>
                    <img src={`http://localhost:9000/img/${element.Src}`} alt={element.Alt} />
                    <p>{element.Description}</p>
                    <Link to={`/liste-des-prises/${element.id}/detail`}>Plus d'infos</Link>
                </article>
            ))}
            </section>
        </main>
    )
}

export default CatchList