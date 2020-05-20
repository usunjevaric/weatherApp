import React from "react";
import axios from "axios";
import Current from "./components/current/Current";
import Forecast from "./components/forecast/Forecast";
import Search from "./components/search/Search";
import Spinner from "./components/spinner/Spinner";
const URL_DATA = {
  url: "https://api.openweathermap.org/data/2.5/weather",
  forecastUrl: "https://api.openweathermap.org/data/2.5/forecast",
  key: "31a5d88b09146c234b7ac6e735c74461",
  iconUrl: "https://openweathermap.org/img/wn/",
};

class App extends React.Component {
  state = {
    search: {
      lat: null,
      long: null,
      city: null,
      units: "metric",
    },
    data: null,
    loading: false,
    error: {
      isError: false,
      errorMessage: null,
    },
    forecast: null,
    getTime: null,
    notFound: null,
  };

  componentDidMount() {
    if ("geolocation" in navigator) {
      this.setState({ loading: true });
      const { search } = this.state;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          search.lat = position.coords.latitude;
          search.long = position.coords.longitude;
          this.setState({ search: search }, () => {
            this.fetchData();
            this.fetchForecast();
          });
        },
        (error) => this.setState({ error: { isError: true, errorMessage: error.message } })
      );
    } else {
      this.setState({ error: "Enter location manualy" });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search.city !== this.state.search.city ||
      (prevState.search.lat !== this.state.search.lat &&
        prevState.search.long !== this.state.search.long)
    ) {
      this.fetchData();
      this.fetchForecast();
    }
  }

  fetchData() {
    this.setState({ loading: true });
    let { city, units, lat, long } = this.state.search;
    let url;
    if (city) {
      url = `${URL_DATA.url}?q=${city}&appid=${URL_DATA.key}&units=${units}`;
    } else if (lat && long) {
      url = `${URL_DATA.url}?lat=${lat}&lon=${long}&appid=${URL_DATA.key}&units=${units}`;
    } else {
      console.log("enter manual");
      return;
    }
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          data: {
            city: data.name,
            country: data.sys.country,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            main: data.weather[0].main,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            cloudiness: data.clouds.all,
          },
          loading: false,
        });
      })
      .catch((err) => this.setState({ notFound: true }));
  }

  fetchForecast() {
    this.setState({ loading: true });
    let { city, units, lat, long } = this.state.search;
    let url;
    if (city) {
      url = `${URL_DATA.forecastUrl}?q=${city}&appid=${URL_DATA.key}&units=${units}`;
    } else if (lat && long) {
      url = `${URL_DATA.forecastUrl}?lat=${lat}&lon=${long}&appid=${URL_DATA.key}&units=${units}`;
    } else {
      console.log("enter manual");
      return;
    }
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        const forecast = [];
        data.list.forEach((listEl) => {
          if (listEl.dt_txt.split(" ")[1] === "15:00:00") {
            forecast.push(listEl);
          }
        });
        this.setState({ forecast: forecast, loading: false, getTime: data.list[0].dt_txt });
      })
      .catch((err) => {});
  }

  searchHandler = (city) => {
    const search = { ...this.state.search };
    search.city = city;
    this.setState({ search: search });
  };

  render() {
    let currentForecast;
    if (this.state.data && this.state.forecast && !this.state.loading) {
      currentForecast = (
        <React.Fragment>
          <Current data={this.state.data} />
          <Forecast data={this.state.forecast} />
        </React.Fragment>
      );
    } else if (this.state.error.isError) {
      currentForecast = <p className='current-error'>Enter location for search</p>;
    } else if (this.state.notFound) {
      currentForecast = <p className='current-error'>Location not found! Please try again</p>;
    } else {
      currentForecast = <Spinner />;
    }

    return (
      <div className='app'>
        <div className='app-wrapper'>
          <Search search={(val) => this.searchHandler(val)} updateTime={this.state.getTime} />
          {currentForecast}
        </div>
      </div>
    );
  }
}

export default App;
