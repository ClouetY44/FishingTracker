import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function PostCatch() {
  const user = useSelector((state) => state.user.username);
  const lakeRef = useRef();
  const fishRef = useRef();
  const weatherRef = useRef();
  const methodRef = useRef();
  const releasedRef = useRef();
  const windRef = useRef();
  const lengthRef = useRef();
  const weightRef = useRef();
  const descriptionRef = useRef();
  const catch_DateRef = useRef();
  // const catchImageRef = useRef()

  const [msg, setMsg] = useState("");
  const [lakes, setLakes] = useState([]);
  const [fishs, setFishes] = useState([]);
  const [weather, setWeather] = useState([]);
  const [method, setMethod] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [description, setDescription] = useState("");

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleChangeText = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (lakeRef.current) {
      lakeRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
    if (fishRef.current) {
      fishRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
    if (weatherRef.current) {
      weatherRef.current.focus();
    }
  }, [msg]);

  useEffect(() => {
    if (methodRef.current) {
      methodRef.current.focus();
    }
  }, [msg]);

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
          setMsg("Erreur lors de la récupération des rôles");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchLakes();
  }, []);

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
          setMsg("Erreur lors de la récupération des poissons");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchWeather();
  }, []);

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
          setMsg("Erreur lors de la récupération des poissons");
        }
      } catch (error) {
        setMsg("Erreur serveur");
      }
    };
    fetchMethod();
  }, []);

  const postCaptureSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData()
      formData.append("user", user)
      formData.append("lake", lakeRef.current.value)
      formData.append("fish", fishRef.current.value)
      formData.append("weather", weatherRef.current.value)
      formData.append("method", methodRef.current.value)
      formData.append("released", releasedRef.current.value)
      formData.append("wind", windRef.current.value)
      formData.append("length", lengthRef.current.value)
      formData.append("weight", weightRef.current.value)
      formData.append("description", descriptionRef.current.value)
      formData.append("catch_Date", catch_DateRef.current.value)
      formData.append("alt", "photo du poisson capturé")
      formData.append("image", event.target["image"].files[0])
      // const lake = lakeRef.current.value;
      // const fish = fishRef.current.value;
      // const weather = weatherRef.current.value;
      // const method = methodRef.current.value;
      // const released = releasedRef.current.value;
      // const wind = windRef.current.value;
      // const length = lengthRef.current.value;
      // const weight = weightRef.current.value;
      // const description = descriptionRef.current.value;
      // const catch_Date = catch_DateRef.current.value;
      // const src = catchImageRef.current.value
      // const datas = formData
      // console.log(datas)
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/catch`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "",
        // },
        body: formData,
        credentials: "include",
      }
      )
      if (response.ok) {
        const post = await response.json()
        setMsg("Prise déposée avec succès");
      } else setMsg("Echec, la prise n'a pas été déposée");
    } catch (error) {
      setMsg("Erreur serveur");
    }
  };

  return (
    <>
      <main>
        <form onSubmit={postCaptureSubmit} encType="multipart/form-data">
          <legend>Déposer une prise</legend>
          <label htmlFor="fish">Nom du poisson :</label>
          {fishs && fishs.length > 0 && (
            <select ref={fishRef} id="fish" name="fish">
              {fishs.map((fish, index) => (
                <option key={index} value={fish.Title}>
                  {fish.Title}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="lake">Nom de l'étang :</label>
          {lakes && lakes.length > 0 && (
            <select ref={lakeRef} id="lake" name="lake">
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
          <label htmlFor="method">Technique de pêche utilisé :</label>
          {method && method.length > 0 && (
            <select ref={methodRef} id="method" name="method">
              {method.map((method, index) => (
                <option key={index} value={method.Title}>
                  {method.Title}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="released">Remis en liberté :</label>
          <select ref={releasedRef} name="released" id="released">
            <option value="">Choisis une option</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          <label htmlFor="weather">Météo :</label>
          {weather && weather.length > 0 && (
            <select ref={weatherRef} id="weather" name="weather">
              {weather.map((weather, index) => (
                <option key={index} value={weather.Title}>
                  {weather.Title}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="wind">Force du vent :</label>
          <select
            ref={windRef}
            id="wind"
            name="wind"
            value={selectedOption3}
            onChange={handleChange3}
          >
            {[...Array(101).keys()].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
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
          <label htmlFor="date">Date de la prise :</label>
          <input
            type="date"
            id="date"
            ref={catch_DateRef}
          />
          <label htmlFor="image">Photo de la prise :</label>
          <input
            type="file"
            id="image"
            name="image"
            // ref={catchImageRef}
          />
          <button type="submit">Déposer votre prise</button>
          {msg && <p className="msg">{msg}</p>}
        </form>
      </main>
    </>
  );
}

export default PostCatch;
