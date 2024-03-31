import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons"

import { fetchHome } from "../../../store/slice/home";

function Home() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHome());
  }, []);

  return (
    <main className="home">
      <dl><FontAwesomeIcon icon={faBell} />  Fishing Tracker vous souhaite de Joyeuses Pâques    <FontAwesomeIcon icon={faBell} /></dl>
      <h2>Fishing Tracker</h2>
      <article>
        <p>
          Bienvenue sur Fishing Tracker. Que vous soyez un pêcheur passionné à
          la recherche de nouveaux étangs à découvrir ou un amateur désireux de
          partager vos plus belles prises, cette plateforme est conçue pour
          vous. Explorez les lieux de pêche à proximité et découvrez les espèces
          de poissons que vous pourriez rencontrer. De plus, avec notre fonction
          de partage de prises, vous pouvez immortaliser vos moments de succès
          et les partager avec une communauté de passionnés. Que vous soyez
          novice ou expert, préparez-vous à plonger dans une aventure
          inoubliable avec Fishing Tracker.
        </p>
        <div className="carousel">
        <CCarousel controls indicators transition="crossfade">
          {list.map((element) => (
          <CCarouselItem >
            <CImage className="d-block w-100" src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`} alt={element.Alt} />
          </CCarouselItem>
          ))}
        </CCarousel>
        </div>
      </article>
    </main>
  );
}

export default Home;
