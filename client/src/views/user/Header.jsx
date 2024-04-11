import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import logo from "/logo.png";

function Header() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const role = useSelector((state) => state.user.role);

  return (
    <header>
      <div>
      <NavLink to={""}><img src={logo} alt="logo fishing tracker" /></NavLink>
        <NavLink to={""}>
          <h1>Fishing Tracker</h1>
        </NavLink>
      </div>
      <nav>
        <NavLink to={"liste-des-étangs"}>Étangs</NavLink>
        <NavLink to={"liste-des-poissons"}>Poissons</NavLink>
        <NavLink to={"liste-des-prises"}>Prises</NavLink>
        {isLogged && role === "admin" && <NavLink to={"admin"}>Admin</NavLink>}
        {isLogged && role !== "admin" && (
          <NavLink to={"compte"}>Compte</NavLink>
        )}
        {!isLogged && <NavLink to={"connexion"}>Connexion</NavLink>}
      </nav>
    </header>
  );
}

export default Header;
