import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useEffect, useState } from "react";
import { CardDay } from "./components/CardDay";
import { Loading } from "./components/Loading";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {

  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('')


  useEffect(() => {
    async function fetchWeather() {
      try {
       
        const res = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&city_name=${search}&key=${API_KEY}`)
        const data = await res.json();
        
        if (data.results) {
          setWeather(data.results);
          // setIsLoading(false)
        }

      } catch (erro) {
        console.error('Erro ao buscar API', erro)
      }
    }
    
      fetchWeather()
  }, [search])

  function handleSubmit(formData) {
    setSearch(formData.get('search'))
  }

 
  return (
    <div className="app-container">
      <SearchBar search={search} action={handleSubmit}  />
      {weather ?
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
       : <Loading/>}
    </div>
  );
}

export default App;
