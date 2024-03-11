import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchLake } from "../../../store/slice/lake";

function LakeList(){
    const dispatch = useDispatch()
    const {list} = useSelector((state) => state.lake)
    
    useEffect(() => {
        dispatch(fetchLake())
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

export default LakeList