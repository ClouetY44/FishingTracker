import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

import logo from "/logo.png";
import burger from "/burger.png"

function Header() {
   // Extraction des données de l'état global à l'aide de useSelector
  const isLogged = useSelector((state) => state.user.isLogged);
  
  const role = useSelector((state) => state.user.role);

  const [showBurger, setShowBurger] = useState(false)

  // Rendu du composant
  return (
    <>
    <header>
      <div>
      <NavLink to={""}><img className="logo" src={logo} alt="logo fishing tracker" /></NavLink>
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
      <div id="burger" onClick={() => setShowBurger(!showBurger)}>
        <img className="burger-icon" src={burger} alt="Burger-menu" />
      </div>
    </header>
      {showBurger ? (<MobileMenu setShowBurger={setShowBurger}/>):null}
    </>
  );
}

export default Header;
