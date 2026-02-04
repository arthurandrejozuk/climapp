import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useState } from "react";
import { CardDay } from "./components/CardDay";
import { Loading } from "./components/Loading";
import { formatTime } from "./utils/function";
import { useLocalWeather } from "./hooks/useLocalWeather";



function App() {

  const [search, setSearch] = useState('') 

  const { 
    weather,
    loading
  } = useLocalWeather(search);


 function handleSubmit(formData) {
    setSearch(formData.get('search'))
  } 

  return (
    <div className="app-container">
      <SearchBar search={search} action={handleSubmit} />
      {loading ? <Loading /> : weather ?
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
        : <></>}
    </div>
  );
}

export default App;
