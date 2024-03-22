import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchFish } from "../../../store/slice/fish";

function FishList(){
    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.fish)
    
    useEffect(() => {
        dispatch(fetchFish())
    }, [])
    

    return (
        <main>
            <h2>Liste des poissons</h2>
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

export default FishList