import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

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
            {list.map((list) =>(
                <article>
                <div key={list.id}>
                    <h3>{list.Title}</h3>
                    <img src={`http://localhost:9000/img/${list.Src}`} alt={list.Alt} />
                    <p>{list.Description}</p>
                    <NavLink to={""}>Plus d'infos</NavLink>
                </div>
                </article>
            ))}
            </section>
        </main>
    )
}

export default LakeList