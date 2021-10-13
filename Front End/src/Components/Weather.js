import React from "react";
import apiKeys from "../API/apiKeys";
import Clock from "react-live-clock";
import Forecast from "./Forecast";
import loader from "../Images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import firebase from "../API/firebase";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
class Weather extends React.Component {
  state = {
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    if(this.state.lat===undefined && this.state.lon===undefined){
      if (navigator.geolocation) {
        this.getPosition()
          //If user allow location service then will fetch data & send it to get-weather function.
          .then((position) => {
            this.getWeather(position.coords.latitude, position.coords.longitude);
          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            this.getWeather(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
      } else {
        alert("Geolocation not available");
      }
    } else {
      
    }    

      this.timerID = setInterval(
        () => this.getWeather(this.state.lat, this.state.lon),
        600000
      );
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  live = async () => {
    const liveref = firebase.database().ref();
     liveref.on('value', (snapshot) => {
       let weather = snapshot.val();
       this.setState({
        temperatureC: Math.round(weather.live_data.Temperature),
        temperatureF: Math.round(weather.live_data.Temperature * 1.8 + 32),
        weather: weather
       })
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject);
    });
    
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    
    this.live();
    // console.log(liveData);
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      main: data.weather[0].main,
      country: data.sys.country,
    });
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  render() {
    
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} timezone={'Asia/Kolkata'} onChange={({output}) => {if(output==="23:59:59")this.setState({day: "updated"})}}/>
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature" id="big-temp">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forecast icon={this.state.icon} text={this.state.main} weather={this.state.weather} day={new Date().getDay()}  />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="Loader GIF"/>
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be displayed on the App <br></br> & used
            for calculating Realtime weather conditions.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
