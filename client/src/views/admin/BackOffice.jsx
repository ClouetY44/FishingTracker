import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import DeleteUser from "./form/DeleteUser";
import UpdateRole from "./form/UpdateRole";
import DeleteLake from "./form/DeleteLake";
import DeleteFish from "./form/DeleteFish";
import Infos from "./Infos";
import { logout } from "../../store/slice/user";

function BackOffice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <main>
      <section className="adminPanel">
        <h2>Panneau Administrateur</h2>
        <button onClick={handleLogout}>Se déconnecter</button>
        <article>
          <Infos />
        </article>
        <DeleteUser />
        <UpdateRole />
        <DeleteLake />
        <DeleteFish />
      </section>
    </main>
  );
}

export default BackOffice;
