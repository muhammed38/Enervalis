import React from 'react';
import WeatherNext5Days from './weatherNext5DaysItem'
import './weather.css';

class WeatherNext5DaysMain extends React.Component {

    render() {
        const arrayList = this.props.weatherNext5Days.list

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

        let dag1MinTempLijst = []
        let dag1MaxTempLijst = []
        let dag2MinTempLijst = []
        let dag2MaxTempLijst = []
        let dag3MinTempLijst = []
        let dag3MaxTempLijst = []
        let dag4MinTempLijst = []
        let dag4MaxTempLijst = []
        let dag5MinTempLijst = []
        let dag5MaxTempLijst = []


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
        let dag1MinTemp = Math.min(...dag1MinTempLijst)
        let dag1MaxTemp = Math.max(...dag1MaxTempLijst)
        let dag2MinTemp = Math.min(...dag2MinTempLijst)
        let dag2MaxTemp = Math.max(...dag2MaxTempLijst)
        let dag3MinTemp = Math.min(...dag3MinTempLijst)
        let dag3MaxTemp = Math.max(...dag3MaxTempLijst)
        let dag4MinTemp = Math.min(...dag4MinTempLijst)
        let dag4MaxTemp = Math.max(...dag4MaxTempLijst)
        let dag5MinTemp = Math.min(...dag5MinTempLijst)
        let dag5MaxTemp = Math.max(...dag5MaxTempLijst)

        return (

            <div className="WeatherNext5Days">
                <div className="wrapper">
                    <table>
                        <tbody>
                            <WeatherNext5Days dag={dag1.dt} image={dag1.weather[0].icon} minTemp={dag1MinTemp} maxTemp={dag1MaxTemp} />
                            <WeatherNext5Days dag={dag2.dt} image={dag2.weather[0].icon} minTemp={dag2MinTemp} maxTemp={dag2MaxTemp} />
                            <WeatherNext5Days dag={dag3.dt} image={dag3.weather[0].icon} minTemp={dag3MinTemp} maxTemp={dag3MaxTemp} />
                            <WeatherNext5Days dag={dag4.dt} image={dag4.weather[0].icon} minTemp={dag4MinTemp} maxTemp={dag4MaxTemp} />
                            <WeatherNext5Days dag={dag5.dt} image={dag5.weather[0].icon} minTemp={dag5MinTemp} maxTemp={dag5MaxTemp} />

                        </tbody>
                    </table>
                </div>



            </div>

        )



    }
}
export default WeatherNext5DaysMain