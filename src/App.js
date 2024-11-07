import { Component } from "react";

const PLACES = [
  { name: "Krasnodar", zip: "350000" },
  { name: "Moscow", zip: "101000" },
  { name: "Starominskaya", zip: "352030" },
  { name: "Vladimir", zip: "600009" },
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ weatherData: json });
      });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>LOADING</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <div class="flex justify-center items-center ">
          {PLACES.map((place, index) => (
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              key={index}
              onClick={() => {
                this.setState({ activePlace: index });
              }}
            >
              {place.name}
            </button>
          ))}
        </div>
        <div class="m-10 justify-center flex items-center">
          <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
        </div>
      </div>
    );
  }
}

export default App;
