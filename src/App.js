import React from 'react';
import './App.css';
import logo from './images/21-512.png'
import WeatherCurrent from './components/weatherCurrent'
import WeatherNext5DaysMain from './components/weatherNext5DaysMain'
import './components/weather';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentWeather: null,
      weatherNext5Days: null,
      location: null,
      long: null,
      lat: null,
      error: false
    }
  }
  //refresh page
  onRefresh() {
    window.location.reload();
  }
  componentDidMount() {
    //fetch data for weather component 
    navigator.geolocation.getCurrentPosition(
      position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "139&APPID=e5f670fdf8c2ffde3c546ffe925fec22&units=metric"
        )
          .then(response => response.json())
          .then(data => this.setState({
            currentWeather: data,
            error: false
          }), (error) => {
            this.setState({
              error: true
            })
          })

      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    //fetch data for weather5days component 
    navigator.geolocation.getCurrentPosition(
      position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "139&APPID=e5f670fdf8c2ffde3c546ffe925fec22&units=metric"
        )
          .then(response => response.json())
          .then(data => this.setState({
            weatherNext5Days: data,
            error: false
          }), (error) => {
            this.setState({
              error: true
            })
          })

      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  }

  render() {
    //check if we got data from api
    if (this.state.currentWeather === null || this.state.weatherNext5Days === null) {
      console.log("data is loading")
      if (this.state.error) {
        return (
          <div className="errorStyle">
            <h1>;(</h1>
            <h2>not Connected to the internet</h2>
            <h3>try again after establishing network connection</h3>
          </div>
        )
      }
      // fancy loading screen ??
      return (<div>
        loading
          </div>)
    } else {
      return (

        <div className="App">
          <div className="WrapperApp">
            <div className="buttonDiv" onClick={this.onRefresh}>

              <table>
                <tbody>
                  <tr><td><img className="imageButton" src={logo}></img></td>
                    <td> <p className="refreshText">Refresh</p></td></tr>
                </tbody>
              </table>

            </div>

            <WeatherCurrent currentWeather={this.state.currentWeather} />
            <WeatherNext5DaysMain weatherNext5Days={this.state.weatherNext5Days} />
          </div>
        </div>


      )
    }
  }


}

export default App;
