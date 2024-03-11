import { Routes, Route } from "react-router-dom";

import UserLayout from "../views/layout/UserLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import FishList from "../views/user/Fish/List";
import LakeList from "../views/user/Lake/List";

function UserRoutes(){

    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route>
                    <Route path="connexion" element={<Login/>}></Route>
                    <Route path="inscription" element={<Register/>}></Route>
                    <Route path="liste-des-poissons" element={<FishList/>}></Route>
                    <Route path="liste-des-étangs" element={<LakeList/>}></Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default UserRoutes;