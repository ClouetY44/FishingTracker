import SliderHome from "./Slider";

function Home() {
  return (
    <main className="home">
        <h2>Fishing Tracker</h2>
        <article>
      <p>Bienvenue sur Fishing Tracker. Que vous soyez un pêcheur passionné à la recherche de nouveaux étangs à découvrir ou un amateur désireux de partager vos plus belles prises, cette plateforme est conçue pour vous. Explorez les lieux de pêche à proximité et découvrez les espèces de poissons que vous pourriez rencontrer. De plus, avec notre fonction de partage de prises, vous pouvez immortaliser vos moments de succès et les partager avec une communauté de passionnés. Que vous soyez novice ou expert, préparez-vous à plonger dans une aventure inoubliable avec Fishing Tracker.</p>
        <SliderHome />
        </article>
    </main>
  );
}

export default Home;
