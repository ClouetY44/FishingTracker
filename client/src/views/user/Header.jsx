import { useDispatch,useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../store/slice/user";
import logo from "/logo.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(state => state.user.isLogged);


  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <header>
      <div>
        <img src={logo} alt="logo fishing tracker" />
        <NavLink to={""}>
          <h1>Fishing Tracker</h1>
        </NavLink>
      </div>
      <nav>
        <NavLink to={"liste-des-étangs"}>Étangs</NavLink>
        <NavLink to={"admin"}>Admin</NavLink>
        <NavLink to={"liste-des-poissons"}>Poissons</NavLink>
        <NavLink to={"liste-des-prises"}>Prises</NavLink>
        {isLogged ? (<NavLink to={"compte"}>Compte</NavLink>):(<NavLink to={"connexion"}>Connexion</NavLink>)}
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
}

export default Header;
