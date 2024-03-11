import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFish } from "../../../store/slice/fish";

function FishList(){
    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.fish)
    
    useEffect(() => {
        dispatch(fetchFish())
    }, [])
    

    return (
        <main>
            {list.map((list) =>(
                <div key={list.id}>
                    <h4>{list.Title}</h4>
                    <h6>{list.Description}</h6>
                </div>
            ))}
        </main>
    )
}

export default FishList