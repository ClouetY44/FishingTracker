import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
      <p>voici le header</p>
        <button onClick={handleLogout}>Se déconnecter</button>
        <Link to="/connexion">Se connecter</Link>
    </header>
  );
}

export default Header;
