import React from 'react';
import Weather5Days from './weather5Days';
import './weather.css';
import logo from '../images/21-512.png'

//CODE BEFORE REFACTOR



class Weather extends React.Component {
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
    onRefresh() {
        window.location.reload();
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
           
            let weatherObject = this.state.currentWeather.weather;
            let mainObject = this.state.currentWeather.main;

            //data weather component
            let imageSource = "http://openweathermap.org/img/wn/" + weatherObject[0].icon + "@2x.png"
            let imageDiscreption = weatherObject[0].description
            let minMaxText = "min. " + mainObject.temp_min + "°C / max. " + mainObject.temp_max + "°C"

            const arrayList = this.state.weatherNext5Days.list

            //de komende 5 dagen uit de array halen
            let dag1 = arrayList[0]
            let dag2 = arrayList[8]
            let dag3 = arrayList[16]
            let dag4 = arrayList[24]
            let dag5 = arrayList[32]

            // de dag nummer nemen van een timestamp van de komende 5 dagen
            let dag1TimeStamp = new Date(dag1.dt * 1000).getDay()
            let dag2TimeStamp = new Date(dag2.dt * 1000).getDay()
            let dag3TimeStamp = new Date(dag3.dt * 1000).getDay()
            let dag4TimeStamp = new Date(dag4.dt * 1000).getDay()
            let dag5TimeStamp = new Date(dag5.dt * 1000).getDay()

            let dag1MinTempLijst= []
            let dag1MaxTempLijst= []
            let dag2MinTempLijst= []
            let dag2MaxTempLijst= []
            let dag3MinTempLijst= []
            let dag3MaxTempLijst= []
            let dag4MinTempLijst= []
            let dag4MaxTempLijst= []
            let dag5MinTempLijst= []
            let dag5MaxTempLijst= []


            for (let index = 0; index < arrayList.length; index++) {
                const element = arrayList[index];
                //timestamp van elk 3 uur in een datum omzetten
                let TimeStamp = new Date(element.dt * 1000)
                let _dag = TimeStamp.getDay()
                //Kijken of het de zelfde dagen zijn -> opslaan in de juiste lijst
                if (dag1TimeStamp === _dag) {
                    dag1MinTempLijst.push(arrayList[index].main.temp_min)
                    dag1MaxTempLijst.push(arrayList[index].main.temp_max)
                }
                if (dag2TimeStamp === _dag) {
                    dag2MinTempLijst.push(arrayList[index].main.temp_min)
                    dag2MaxTempLijst.push(arrayList[index].main.temp_max)
                }
                if (dag3TimeStamp === _dag) {
                    dag3MinTempLijst.push(arrayList[index].main.temp_min)
                    dag3MaxTempLijst.push(arrayList[index].main.temp_max)
                }
                if (dag4TimeStamp === _dag) {
                    dag4MinTempLijst.push(arrayList[index].main.temp_min)
                    dag4MaxTempLijst.push(arrayList[index].main.temp_max)
                }
                if (dag5TimeStamp === _dag) {
                    dag5MinTempLijst.push(arrayList[index].main.temp_min)
                    dag5MaxTempLijst.push(arrayList[index].main.temp_max)                
                }

            }

            // get min max of the arrays
            let dag1MinTemp=Math.min(...dag1MinTempLijst)
            let dag1MaxTemp=Math.max(...dag1MaxTempLijst)
            let dag2MinTemp=Math.min(...dag2MinTempLijst)
            let dag2MaxTemp=Math.max(...dag2MaxTempLijst)
            let dag3MinTemp=Math.min(...dag3MinTempLijst)
            let dag3MaxTemp=Math.max(...dag3MaxTempLijst)
            let dag4MinTemp=Math.min(...dag4MinTempLijst)
            let dag4MaxTemp=Math.max(...dag4MaxTempLijst)
            let dag5MinTemp=Math.min(...dag5MinTempLijst)
            let dag5MaxTemp=Math.max(...dag5MaxTempLijst)
             
            return (

                <div className="WrapperApp">
                    <div className="buttonDiv" onClick={this.onRefresh}>

                        <table>
                            <tbody>
                                <tr><td><img className="imageButton" src={logo}></img></td>
                                    <td> <p className="refreshText">Refresh</p></td></tr>
                            </tbody>
                        </table>



                    </div>
                    <div className="Weather">


                        <img style={{ padding: 0, margin: 0 }} src={imageSource}></img>
                        <p style={{ fontSize: 20, color: '#FFFFFF', padding: 0, margin: 0, textTransform: 'capitalize' }}>{imageDiscreption}</p>
                        <p style={{ fontSize: 20, color: '#FFFFFF', padding: 0, margin: 0 }}>{mainObject.temp + "°C"}</p>
                        <p style={{ fontSize: 14, color: '#FFFFFF', margin: 30 }}>{minMaxText}</p>


                    </div>

                    <div className="WeatherNext5Days">
                        <div className="wrapper">
                            <table>
                                <tbody>
                                    <Weather5Days dag={dag1.dt} image={dag1.weather[0].icon} minTemp={dag1MinTemp} maxTemp={dag1MaxTemp} />
                                    <Weather5Days dag={dag2.dt} image={dag2.weather[0].icon} minTemp={dag2MinTemp} maxTemp={dag2MaxTemp} />
                                    <Weather5Days dag={dag3.dt} image={dag3.weather[0].icon} minTemp={dag3MinTemp} maxTemp={dag3MaxTemp} />
                                    <Weather5Days dag={dag4.dt} image={dag4.weather[0].icon} minTemp={dag4MinTemp} maxTemp={dag4MaxTemp} />
                                    <Weather5Days dag={dag5.dt} image={dag5.weather[0].icon} minTemp={dag5MinTemp} maxTemp={dag5MaxTemp} />

                                </tbody>
                            </table>
                        </div>



                    </div>

                </div>



            )
        }


    }
}
export default Weather