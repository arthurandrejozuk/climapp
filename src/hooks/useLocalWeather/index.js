import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useLocalWeather = (search) => {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!search) return;
        async function fetchWeather() {
            try {

                const res = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&city_name=${search}&key=${API_KEY}`)
                const data = await res.json();

                if (data.results) {
                    setWeather(data.results);
                    setLoading(false)
                }

            } catch (erro) {
                console.error('Erro ao buscar API', erro)
            } finally {
                setLoading(false);
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
                    setLoading(false);
                } else {
                    setError("Não foi possível obter os dados do clima.");
                    setLoading(false);
                    throw new Error(error);
                }
            } catch (err) {
                setError("Erro ao buscar dados do clima. " + err);
                   setLoading(false);
            }
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchByCoordinates(latitude, longitude);
                },
                (err) => {
                    setError("Permissão de localização negada. " + err.message);
                    throw new Error(error);
                }
            );
        } else {
            setError("Geolocalização não suportada pelo navegador.");
        }
    }, []);


    return {
        weather,
        loading
    }
}