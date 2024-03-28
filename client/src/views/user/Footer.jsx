import { Link } from "react-router-dom";
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
      <Link to={"/a"}>Politique de confidentialité</Link>{" "}
        | <Link to={"/conditions-d-utilisation"}>Conditions d'utilisation</Link>
      </p>
      <nav>
        <Link to={""}>
          <FontAwesomeIcon
            icon={faSquareFacebook}
            style={{ color: "#e5e5e5" }}
          />
        </Link>
        <Link to={""}>
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#e5e5e5" }} />
        </Link>
        <Link to={""}>
        <FontAwesomeIcon icon={faSquareXTwitter} style={{ color: "#e5e5e5" }} />
        </Link>
        <Link to={""}>
          <FontAwesomeIcon
            icon={faSquareInstagram}
            style={{ color: "#e5e5e5" }}
          />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
