import React from 'react';
import './weather.css';

class Weather5Days extends React.Component {

    render() {
        //De juiste logo link maken
        let imageSource = "http://openweathermap.org/img/wn/" + this.props.image + "@2x.png"
        //De nummer van de dag halen uit de timestamp
        let dag = this.props.dag
        let date = new Date(dag * 1000)
        var weekday = new Array(7);
        weekday[0] = "zondag";
        weekday[1] = "maandag";
        weekday[2] = "dinsdag";
        weekday[3] = "woensdag";
        weekday[4] = "donderdag";
        weekday[5] = "vrijdag";
        weekday[6] = "zaterdag";
        return (
            <tr>
                <td><p  className="dagStyle" >{weekday[date.getDay()]}</p>
                </td>
                <td><img className="logoStyle" src={imageSource}></img>
                </td>
                <td><p className="minTempStyle" >{this.props.minTemp + "°C"}</p>
                </td>
                <td><p className="maxTempStyle" >{this.props.maxTemp + "°C"}</p>
                </td>

            </tr>


        )
    }
}
export default Weather5Days