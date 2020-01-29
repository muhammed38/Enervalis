import React from 'react';
import './weather.css';

class WeatherCurrent extends React.Component {
    
    onRefresh() {
        window.location.reload();
    }
    render() {
      
            let weatherObject = this.props.currentWeather.weather;
            let mainObject = this.props.currentWeather.main;

            //data weather component
            let imageSource = "http://openweathermap.org/img/wn/" + weatherObject[0].icon + "@2x.png"
            let imageDiscreption = weatherObject[0].description
            let minMaxText = "min. " + mainObject.temp_min + "°C / max. " + mainObject.temp_max + "°C"

             
            return (

                    <div className="Weather">

                        <img style={{ padding: 0, margin: 0 }} src={imageSource}></img>
                        <p style={{ fontSize: 20, color: '#FFFFFF', padding: 0, margin: 0, textTransform: 'capitalize' }}>{imageDiscreption}</p>
                        <p style={{ fontSize: 20, color: '#FFFFFF', padding: 0, margin: 0 }}>{mainObject.temp + "°C"}</p>
                        <p style={{ fontSize: 14, color: '#FFFFFF', margin: 30 }}>{minMaxText}</p>

                    </div>

            )
        }
    
}
export default WeatherCurrent