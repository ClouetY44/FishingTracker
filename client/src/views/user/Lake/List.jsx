import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchLake } from "../../../store/slice/lake";

function LakeList(){
    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.lake)
    
    useEffect(() => {
        dispatch(fetchLake())
    }, [])
    

    return (
        <main>
            <h2>Liste des étangs</h2>
            <section>
            {list.map((element) =>(
                <article key={element.id}>
                    <h3>{element.Title}</h3>
                    <img src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`} alt={element.Alt} />
                    <p>{element.Description}</p>
                    <Link to={`/liste-des-étangs/${element.id}/detail`}>Plus d'infos</Link>
                </article>
            ))}
            </section>
        </main>
    )
}

export default LakeList