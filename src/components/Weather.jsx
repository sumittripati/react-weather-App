





import React, { useState } from 'react';
import './weather.css';
import { FaSearch } from 'react-icons/fa';
import { TiWeatherSunny } from 'react-icons/ti';
import { WiHumidity } from 'react-icons/wi';
import { SiAccuweather } from 'react-icons/si';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const search = async () => {
    if (!city) {
      setError('Please enter a city');
      return;
    }
    setError('');
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="weather">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FaSearch className="icons" onClick={search} />
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <>
            <p>
              <TiWeatherSunny className="sun-icon" />
            </p>
            <p className="temp">{`${weatherData.main.temp}°C`}</p>
            <p className="location">{weatherData.name}</p>
            <div className="weather-data">
              <div className="col">
                <WiHumidity className="icons" />
                <div>
                  <p>{`${weatherData.main.humidity}%`}</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <SiAccuweather className="icons" />
                <div>
                  <p>{`${weatherData.wind.speed} km/h`}</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
