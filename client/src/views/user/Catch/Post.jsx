import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function PostCatch() {
  // Récupération du nom d'utilisateur à partir du state Redux
  const user = useSelector((state) => state.user.username);
  // Référence pour l'input du nom de l'étang
  const lakeRef = useRef();
  // Référence pour l'input du nom du poisson
  const fishRef = useRef();
  // Référence pour l'input de la météo
  const weatherRef = useRef();
  // Référence pour l'input de la technique de pêche
  const methodRef = useRef();
  // Référence pour l'input sur si le poisson a été relâché
  const releasedRef = useRef();
  // Référence pour l'input de la longueur du poisson
  const lengthRef = useRef();
  // Référence pour l'input du poids du poisson
  const weightRef = useRef();
  // Référence pour l'input de la description de la prise
  const descriptionRef = useRef();
  // Référence pour l'input de la date de la prise
  const catch_DateRef = useRef();

  // État pour afficher les messages de succès ou d'erreur
  const [msg, setMsg] = useState("");
  // État pour stocker la liste des étangs
  const [lakes, setLakes] = useState([]);
  // État pour stocker la liste des poissons
  const [fishs, setFishes] = useState([]);
  // État pour stocker la liste des conditions météorologiques
  const [weather, setWeather] = useState([]);
  // État pour stocker la liste des techniques de pêche
  const [method, setMethod] = useState([]);
  // État pour gérer l'option sélectionnée pour la longueur du poisson
  const [selectedOption, setSelectedOption] = useState("");
  // État pour gérer l'option sélectionnée pour le poids du poisson
  const [selectedOption2, setSelectedOption2] = useState("");
  // État pour stocker la description de la prise
  const [description, setDescription] = useState("");

  // Gestionnaire de changement pour la sélection de la longueur du poisson
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Gestionnaire de changement pour la sélection du poids du poisson
  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  // Gestionnaire de changement pour la saisie de la description de la prise
  const handleChangeText = (event) => {
    setDescription(event.target.value);
  };

  // Effet pour mettre le focus sur le champ du nom de l'étang lorsqu'un message est affiché
  useEffect(() => {
    if (lakeRef.current) {
      lakeRef.current.focus();
    }
  }, [msg]);

  // Effet pour mettre le focus sur le champ du nom du poisson lorsqu'un message est affiché
  useEffect(() => {
    if (fishRef.current) {
      fishRef.current.focus();
    }
  }, [msg]);

  // Effet pour mettre le focus sur le champ de la météo lorsqu'un message est affiché
  useEffect(() => {
    if (weatherRef.current) {
      weatherRef.current.focus();
    }
  }, [msg]);

  // Effet pour mettre le focus sur le champ de la technique de pêche lorsqu'un message est affiché
  useEffect(() => {
    if (methodRef.current) {
      methodRef.current.focus();
    }
  }, [msg]);

  // Effet pour récupérer la liste des étangs depuis l'API
  useEffect(() => {
    const fetchLakes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/lake`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLakes(data);
        } else {
          setMsg("Erreur lors de la récupération des étangs");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchLakes();
  }, []);

  // Effet pour récupérer la liste des poissons depuis l'API
  useEffect(() => {
    const fetchFishs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/fish`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFishes(data);
        } else {
          setMsg("Erreur lors de la récupération des poissons");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchFishs();
  }, []);

  // Effet pour récupérer la liste des conditions météorologiques depuis l'API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/weather`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          setMsg("Erreur lors de la récupération des conditions météos");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchWeather();
  }, []);

  // Effet pour récupérer la liste des techniques de pêche depuis l'API
  useEffect(() => {
    const fetchMethod = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/method`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMethod(data);
        } else {
          setMsg("Erreur lors de la récupération des techniques de pêche");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchMethod();
  }, []);

  // Gestionnaire de soumission du formulaire pour poster une prise
  const postCaptureSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      // Ajout du nom d'utilisateur dans les données du formulaire
      formData.append("user", user);

      // Ajout du nom de l'étang dans les données du formulaire
      formData.append("lake", lakeRef.current.value);

      // Ajout du nom du poisson dans les données du formulaire
      formData.append("fish", fishRef.current.value);

      // Ajout de la météo dans les données du formulaire
      formData.append("weather", weatherRef.current.value);

      // Ajout de la technique de pêche dans les données du formulaire
      formData.append("method", methodRef.current.value);

      // Ajout de l'information de relâchement dans les données du formulaire
      formData.append("released", releasedRef.current.value);

      // Ajout de la longueur du poisson dans les données du formulaire
      formData.append("length", lengthRef.current.value);

      // Ajout du poids du poisson dans les données du formulaire
      formData.append("weight", weightRef.current.value);

      // Ajout de la description dans les données du formulaire
      formData.append("description", descriptionRef.current.value);

      // Ajout de la date de la prise dans les données du formulaire
      formData.append("catch_Date", catch_DateRef.current.value);

      // Ajout de l'attribut alt pour l'image
      formData.append("alt", "photo du poisson capturé");

      // Ajout de l'image dans les données du formulaire
      formData.append("image", event.target["image"].files[0]);

      // Envoi des données du formulaire à l'API pour poster la prise
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/catch`,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "",
          // },
          body: formData,
          credentials: "include",
        }
      );
      // Vérification de la réussite de la requête
      if (response.ok) {
        setMsg("Prise déposée avec succès");
      } else {
        setMsg("Echec, vérifiez la photo ou les champs obligatoires");
      }
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  // Rendu du composant
  return (
    <>
      <main>
        <form onSubmit={postCaptureSubmit} encType="multipart/form-data">
          <legend>Déposer une prise</legend>
          <label className="required" htmlFor="fish">
            Espèce du poisson :
          </label>
          {fishs && fishs.length > 0 && (
            <select ref={fishRef} id="fish" name="fish" required>
              <option value="">Choisis une option</option>
              {fishs.map((fish, index) => (
                <option key={index} value={fish.Title}>
                  {fish.Title}
                </option>
              ))}
            </select>
          )}
          <label className="required" htmlFor="lake">
            Nom de l'étang :
          </label>
          {lakes && lakes.length > 0 && (
            <select ref={lakeRef} id="lake" name="lake" required>
              <option value="">Choisis une option</option>
              {lakes.map((lake, index) => (
                <option key={index} value={lake.Title}>
                  {lake.Title}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="length">Longueur en cm :</label>
          <select
            ref={lengthRef}
            id="length"
            name="length"
            value={selectedOption}
            onChange={handleChange}
          >
            {[...Array(351).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <label htmlFor="weight">Poids en kg :</label>
          <select
            ref={weightRef}
            id="weight"
            name="weight"
            value={selectedOption2}
            onChange={handleChange2}
          >
            {[...Array(151).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <label className="required" htmlFor="method">
            Technique de pêche utilisé :
          </label>
          {method && method.length > 0 && (
            <select ref={methodRef} id="method" name="method" required>
              <option value="">Choisis une option</option>
              {method.map((method, index) => (
                <option key={index} value={method.Title}>
                  {method.Title}
                </option>
              ))}
            </select>
          )}
          <label className="required" htmlFor="released">
            Remis en liberté :
          </label>
          <select ref={releasedRef} name="released" id="released" required>
            <option value="">Choisis une option</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          <label className="required" htmlFor="weather">
            Météo :
          </label>
          {weather && weather.length > 0 && (
            <select ref={weatherRef} id="weather" name="weather" required>
              <option value="">Choisis une option</option>
              {weather.map((weather, index) => (
                <option key={index} value={weather.Title}>
                  {weather.Title}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="description">Description :</label>
          <textarea
            ref={descriptionRef}
            id="description"
            name="description"
            value={description}
            onChange={handleChangeText}
            rows={5}
            cols={30}
            placeholder="Écris ta description ici"
          />
          <label className="required" htmlFor="date">
            Date de la prise :
          </label>
          <input type="date" id="date" ref={catch_DateRef} required />
          <label className="required" htmlFor="image">
            Photo de la prise :
          </label>
          <input type="file" id="image" name="image" required />
          <span>
            Les champs suivis par <span>*</span> sont obligatoire.
          </span>
          <button type="submit">Déposer votre prise</button>
          {msg && <p className="msg">{msg}</p>}
        </form>
      </main>
    </>
  );
}
export default PostCatch;
