import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sunIcon from '../assets/sun-icon.svg';
import pinWeather from '../assets/pin-weather.svg';


const LOCATION = {
  lat: 27.9202,
  lon: -15.5474,
  name: "Las Palmas"
};

export default function WeatherBar() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LOCATION.lat}&lon=${LOCATION.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      const data = await res.json();
      setWeather(data);
    };
    fetchWeather();
  }, []);

  return (
      <>
    <div className="w-93.25 h-27 rounded-[1.8125rem] bg-gradient-green flex items-center justify-center mt-5 mx-auto">
      <section className="w-87 h-17 rounded-[1.8125rem] flex items-center justify-center backdrop-blur-xs bg-white/10 border border-white/30 shadow-xl gap-3">
        <img src={sunIcon} alt="Sun" className="w-8 h-8" />
        {weather ? (
          <>
            <span className="text-white text-[14px] font-orbitron">{weather.main?.temp}°C</span>
            <img src={pinWeather} alt="Sun" className="w-3 h-4" />
            <span className="text-white text-[14px] font-poppins">{LOCATION.name}</span>
          </>
        ) : (
          <span className="text-white text-[17px] font-poppins">Loading...</span>
        )}
      </section>
    </div>
    <div>
          <Link to="/forum" className="ml-3">
            <button type="button" className="flex items-center font-bold justify-center mx-auto mt-8.75 w-58.5 h-13 px-4 py-2 rounded-[1.812rem] bg-accent-green text-white font-poppins text-sm">
              Forum
            </button>
          </Link>
    </div>
  </>
  );
}