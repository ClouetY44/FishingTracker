import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchHome } from "../../../store/slice/home";

function Home() {
  // Dispatch pour effectuer des actions Redux
  const dispatch = useDispatch();

  // Sélection de l'état d'authentification de l'utilisateur depuis le state Redux
  const isLogged = useSelector((state) => state.user.isLogged);

  // Sélection du nom d'utilisateur depuis le state Redux
  const username = useSelector((state) => state.user.username);

  // Sélection de la liste d'images pour le carrousel depuis le state Redux
  const { list } = useSelector((state) => state.home);

  // Effet pour charger les images du carrousel à partir de l'API
  useEffect(() => {
    // Appel de l'action Redux pour charger la liste d'images du carrousel
    dispatch(fetchHome());
  }, []);

    // Rendu du composant
  return (
    <main className="home">
      <h2>Fishing Tracker</h2>
      <article>
        {isLogged ? <p className="welcome">Heureux de vous revoir <span>{username}</span>.</p> : null}
        <p>
          mBienvenue sur Fishing Tracker. Que vous soyez un pêcheur passionné à
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
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src={`${import.meta.env.VITE_API_URL}/img/${element.Src}`}
                  alt={element.Alt}
                />
              </CCarouselItem>
            ))}
          </CCarousel>
        </div>
      </article>
    </main>
  );
}

export default Home;
