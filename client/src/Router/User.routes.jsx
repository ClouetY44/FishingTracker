import { Routes, Route } from "react-router-dom";

import Home from "../views/user/home/Home";
import UserLayout from "../views/layout/UserLayout";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import FishList from "../views/user/Fish/List";
import LakeList from "../views/user/Lake/List";
import CatchList from "../views/user/Catch/List";
import FishDetail from "../views/user/Fish/Detail"
import DetailCatch from "../views/user/Catch/Detail";
import DetailLake from "../views/user/Lake/Detail";
import PrivacyPolicy from "../views/user/PrivacyPolicy";
import TermsOfUse from "../views/user/TermsOfUse";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
          <Route path="" element={<Home />}/>
          <Route path="connexion" element={<Login />}/>
          <Route path="inscription" element={<Register />}/>
          <Route path="a" element={<PrivacyPolicy />}/>
          <Route path="conditions-d-utilisation" element={<TermsOfUse />}/>
          <Route path="liste-des-poissons" element={<FishList />}/>
          <Route path="liste-des-poissons/:id/detail" element={<FishDetail />}/>
          <Route path="liste-des-étangs" element={<LakeList />}/>
          <Route path="liste-des-étangs/:id/detail" element={<DetailLake />}/>
          <Route path="liste-des-prises" element={<CatchList />}/>
          <Route path="liste-des-prises/:id/detail" element={<DetailCatch />}/>
        </Route>
    </Routes>
  );
}

export default UserRoutes;
