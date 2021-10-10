import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast(props) {

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

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
        <h3>{props.text}</h3>

        <ul>
          {typeof props.weather != "undefined" ? (
            <div>
              {" "}
              
              <li>
              Altitude{" "}
                <span className="temp">
                  {Math.round(props.weather.live_data.Altitude)} m
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(props.weather.live_data.Humidity)} %
                </span>
              </li>
              <li>
                Pressure{" "}
                <span className="temp">
                  {Math.round(props.weather.live_data.Pressure)} hpa
                </span>
              </li>
            </div>
          ) : (
            <h1>
               There seems to be an issue with your connection.
            </h1>
          )}
        </ul>
        <h4>5-Day Forecast</h4>
        <div className="search-box">
          <span style={{color: "White"}}>{days[(props.day+1)%7]}  :</span>
          <div className="img-box">
            <span>{props.weather.forecast[`${'Day'+1}`].max}° / {props.weather.forecast[`${'Day'+1}`].min}° C</span>
          </div>
        </div>
        <div className="search-box">
          <span style={{color: "White"}}>{days[(props.day+2)%7]}  :</span>
          <div className="img-box">
            <span>{props.weather.forecast[`${'Day'+2}`].max}° / {props.weather.forecast[`${'Day'+2}`].min}° C</span>
          </div>
        </div>
        <div className="search-box">
          <span style={{color: "White"}}>{days[(props.day+3)%7]}  :</span>
          <div className="img-box">
            <span>{props.weather.forecast[`${'Day'+3}`].max}° / {props.weather.forecast[`${'Day'+3}`].min}° C</span>
          </div>
        </div>

        <div className="search-box">
          <span style={{color: "White"}}>{days[(props.day+4)%7]}  :</span>
          <div className="img-box">
            <span>{props.weather.forecast[`${'Day'+4}`].max}° / {props.weather.forecast[`${'Day'+4}`].min}° C</span>
          </div>
        </div>

        <div className="search-box">
          <span style={{color: "White"}}>{days[(props.day+5)%7]} :</span>
          <div className="img-box">
            <span>{props.weather.forecast[`${'Day'+5}`].max}° / {props.weather.forecast[`${'Day'+5}`].min}° C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Forecast;
