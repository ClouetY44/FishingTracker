import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MobileMenu({setShowBurger}) {
  const isLogged = useSelector((state) => state.user.isLogged);
  
  const role = useSelector((state) => state.user.role);
  return (
    <nav id="mobile-menu">
        <NavLink to={"liste-des-étangs"} onClick={() => setShowBurger(false)}>Étangs</NavLink>
        <NavLink to={"liste-des-poissons"} onClick={() => setShowBurger(false)}>Poissons</NavLink>
        <NavLink to={"liste-des-prises"} onClick={() => setShowBurger(false)}>Prises</NavLink>
        {isLogged && role === "admin" && <NavLink to={"admin"} onClick={() => setShowBurger(false)}>Admin</NavLink>}
        {isLogged && role !== "admin" && (
          <NavLink to={"compte"} onClick={() => setShowBurger(false)}>Compte</NavLink>
        )}
        {!isLogged && <NavLink to={"connexion"} onClick={() => setShowBurger(false)}>Connexion</NavLink>}
      </nav>
  )
}

export default MobileMenu