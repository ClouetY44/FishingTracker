import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { logout } from "../../store/slice/user";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:9000/api/auth/logout", {
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
      <img src="/src/assets/images/logo.png" alt="logo fishing tracker" />
      </div>
      <NavLink to={""}><h1>Fishing Tracker</h1></NavLink>
      <nav>
       <NavLink to={"liste-des-étangs"}>Étangs</NavLink>
       <NavLink to={"liste-des-poissons"}>Poissons</NavLink>
       <NavLink to={"connexion"}>Connexion</NavLink>
        {/* <button onClick={handleLogout}>Se déconnecter</button> */}
        </nav>
    </header>
  );
}

export default Header;
