import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faYoutube,
  faSquareXTwitter,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <p>© 2024 - Yoann - CLOUET</p>
      <p>
        <a href="/politique-de-confidentialité">Politique de confidentialité</a>{" "}
        | <a href="/conditions-d-utilisation">Conditions d'utilisation</a>
      </p>
      <nav>
        <NavLink to={""}>
          <FontAwesomeIcon
            icon={faSquareFacebook}
            style={{ color: "#e5e5e5" }}
          />
        </NavLink>
        <NavLink to={""}>
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#e5e5e5" }} />
        </NavLink>
        <NavLink to={""}>
        <FontAwesomeIcon icon={faSquareXTwitter} style={{ color: "#e5e5e5" }} />
        </NavLink>
        <NavLink to={""}>
          <FontAwesomeIcon
            icon={faSquareInstagram}
            style={{ color: "#e5e5e5" }}
          />
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
