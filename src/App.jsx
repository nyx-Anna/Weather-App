import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // input
  const [weather, setWeather] = useState(null); // API data
  const [error, setError] = useState(""); // error message
  const [loading, setLoading] = useState(false); // loading state

  const API_KEY = "ab52ae7701e913e88f3980521e8f6298";

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true); // start loading
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );

      const data = await res.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="app">
      <h1>Weather App </h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          // ENTER KEY SUPPORT
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading... ⏳</p>}

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* WEATHER DATA */}
      {weather && !loading && (
        <div className="card">
          <div className="top">
            <p className="city">{weather.name}</p>

            <img
              className="icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
          </div>

          <p className="temp">{weather.main.temp}°C</p>
          <p className="weather">{weather.weather[0].main}</p>

          <div className="details">
            <div className="detail-box">
              <p>💧 {weather.main.humidity}%</p>
              <small>Humidity</small>
            </div>

            <div className="detail-box">
              <p>🌬️ {weather.wind.speed} km/h</p>
              <small>Wind</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
