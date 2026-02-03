import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useEffect, useState } from "react";
import { CardDay } from "./components/CardDay";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {

  const [weather, setWeather] = useState(null);


  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&city_name=Osasco,SP&key=${API_KEY}`)
        const data = await res.json();
        if (data.results) {
          setWeather(data.results);
        }

      } catch (erro) {
        console.error('Erro ao buscar API', erro)
      }
    }
    fetchWeather()
  }, [])

  return (
    <div className="app-container">
      <SearchBar />
      {weather &&
        <>
          <h1>{weather.city}</h1>
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
      }
    </div>
  );
}

export default App;
