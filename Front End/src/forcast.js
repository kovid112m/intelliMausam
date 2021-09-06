import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  // console.log(props);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const name = props.name;

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      ) 
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search(name);
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <span style={{color: "White"}}>Sunday :</span>
          <div className="img-box">
            <span>30/15°c </span>
          </div>
        </div>
        <div className="search-box">
          <span style={{color: "White"}}>Monday :</span>
          <div className="img-box">
            <span>31/16°c </span>
          </div>
        </div>
        <div className="search-box">
          <span style={{color: "White"}}>Tuesday :</span>
          <div className="img-box">
            <span>30/18°c </span>
          </div>
        </div>
        
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)}mi
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Pressure{" "}
                <span className="temp">
                  {Math.round(weather.main.pressure)} hpa
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
