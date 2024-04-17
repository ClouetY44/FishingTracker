import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { checkToken } from "../store/slice/user.js";

import { Routes, Route } from "react-router-dom";

// Import des composants de vue
import Home from "../views/user/home/Home";
import UserLayout from "../views/layout/UserLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import FishList from "../views/user/Fish/List";
import LakeList from "../views/user/Lake/List";
import CatchList from "../views/user/Catch/List";
import FishDetail from "../views/user/Fish/Detail";
import DetailCatch from "../views/user/Catch/Detail";
import DetailLake from "../views/user/Lake/Detail";
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import TermsOfUse from "../views/user/TermsOfUse";
import Dashboard from "../views/user/Dashboard/Dashboard";
import UpdateInfo from "../views/user/Dashboard/data/UpdateUser";
import BackOffice from "../views/admin/BackOffice";
import ProtectedAdmin from "./ProtectedAdmin";
import ProtectedUser from "./ProtectedUser";
import PostCatch from "../views/user/Catch/Post";

// Définition des routes
function UserRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="" element={<Home />} />

        {/* Route protégée pour l'interface d'administration */}
        <Route
          path="admin"
          element={
            <ProtectedAdmin
              redirectPath={"/connexion"}
              child={<BackOffice />}
            />
          }
        />

        {/* Routes pour l'authentification */}
        <Route path="connexion" element={<Login />} />
        <Route path="inscription" element={<Register />} />

        {/* Routes protégées pour le compte utilisateur */}
        <Route
          path="compte"
          element={
            <ProtectedUser redirectPath={"/connexion"} child={<Dashboard />} />
          }
        />
        <Route
          path="compte/modification"
          element={
            <ProtectedUser redirectPath={"/connexion"} child={<UpdateInfo />} />
          }
        />
        <Route
          path="compte/déposer"
          element={
            <ProtectedUser redirectPath={"/connexion"} child={<PostCatch />} />
          }
        />

        {/* Routes vers les différents composants communs de l'app */}
        <Route
          path="politique-de-confidentialité"
          element={<PrivacyPolicy />}
        />
        <Route path="conditions-d-utilisation" element={<TermsOfUse />} />
        <Route path="liste-des-poissons" element={<FishList />} />
        <Route path="liste-des-poissons/:id/detail" element={<FishDetail />} />
        <Route path="liste-des-étangs" element={<LakeList />} />
        <Route path="liste-des-étangs/:id/detail" element={<DetailLake />} />
        <Route path="liste-des-prises" element={<CatchList />} />
        <Route path="liste-des-prises/:id/detail" element={<DetailCatch />} />
        <Route path="*" element={<h2 className="page404">Erreur 404</h2>} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
