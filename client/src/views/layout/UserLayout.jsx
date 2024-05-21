import { Outlet } from "react-router-dom";

// Import du composant d'en-tête
import Header from "../user/Header";
// Import du composant de pied de page
import Footer from "../user/Footer";

function UserLayout() {

  // Rendu du composant
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout