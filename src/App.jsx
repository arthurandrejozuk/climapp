import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useEffect, useState } from "react";
import { CardDay } from "./components/CardDay";
import { Loading } from "./components/Loading";
import { formatTime } from "./utils/function";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {

  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {


    async function fetchWeather() {
      try {

        const res = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&city_name=${search}&key=${API_KEY}`)
        const data = await res.json();

        if (data.results) {
          setWeather(data.results);
        }

      } catch (erro) {
        console.error('Erro ao buscar API', erro)
      }
    }

    fetchWeather()
  }, [search])


  useEffect(() => {
    async function fetchByCoordinates(lat, lon) {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        if (data.results) {
          setWeather(data.results);
        } else {
          setError("Não foi possível obter os dados do clima.");
        }
      } catch (err) {
        setError("Erro ao buscar dados do clima." + err);
        throw new Error(error);
      }
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchByCoordinates(latitude, longitude);
        },
        (err) => {
          setError("Permissão de localização negada." + err);
        }
      );
    } else {
      setError("Geolocalização não suportada pelo navegador.");
      throw new Error(error);
    }
  }, [])

  function handleSubmit(formData) {
    setSearch(formData.get('search'))
  }



  return (
    <div className="app-container">
      <SearchBar search={search} action={handleSubmit} />
      {weather ?
        <>
          <h1>{weather.city}</h1>
          <p>Nascer do sol: {formatTime(weather.sunrise)}/Pôr do sol: {formatTime(weather.sunset)}</p>
          <WeatherCard weather={weather} />
          <div className="cards">
            {weather.forecast.slice(0, 3).map((item, index) => (
              <CardDay
                key={index}
                otherDays={item}
              />
            ))}
          </div>
        </>
        : <Loading />}
    </div>
  );
}

export default App;
