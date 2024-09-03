import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";

import logo from "/logo.png";
import burger from "/burger.jpg"

function Header() {
   // Extraction des données de l'état global à l'aide de useSelector
  const isLogged = useSelector((state) => state.user.isLogged);
  
  const role = useSelector((state) => state.user.role);

  const [showBurger, setShowBurger] = useState(false)

  const burgerRef = useRef(null);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      burgerRef.current && !burgerRef.current.contains(event.target) &&
      menuRef.current && !menuRef.current.contains(event.target)
    ) {
      setShowBurger(false);
    }
  };

  useEffect(() => {
    if (showBurger) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showBurger]);


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
        <div id="burger" ref={burgerRef} onClick={() => setShowBurger(!showBurger)}>
          <img className="burger-icon" src={burger} alt="Burger-menu" />
        </div>
      </header>
      {showBurger && (
        <div ref={menuRef}>
          <MobileMenu setShowBurger={setShowBurger} />
        </div>
      )}
    </>
  );
}

export default Header;
