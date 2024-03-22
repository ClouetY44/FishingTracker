import { Routes, Route } from "react-router-dom";

import Home from "../views/user/home/Home";
import UserLayout from "../views/layout/UserLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import FishList from "../views/user/Fish/List";
import LakeList from "../views/user/Lake/List";
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import TermsOfUse from "../views/user/TermsOfUse";

function UserRoutes(){

    return (
        <Routes>
            <Route path="/" element={<UserLayout/>}>
                <Route>
                    <Route path="" element={<Home/>}></Route>
                    <Route path="connexion" element={<Login/>}></Route>
                    <Route path="inscription" element={<Register/>}></Route>
                    <Route path="liste-des-poissons" element={<FishList/>}></Route>
                    <Route path="liste-des-étangs" element={<LakeList/>}></Route>
                    <Route path="politique-de-confidentialité" element={<PrivacyPolicy/>}></Route>
                    <Route path="conditions-d-utilisation" element={<TermsOfUse/>}></Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default UserRoutes;