import React from 'react';
import clouds from "../icons/clouds.svg";

import { useEffect, useState} from 'react';


//const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_key = "key=AGX6UGDFKCDXBXR42836HWC4L";

const WeatherCard = () => {

    //weather data states
    let [weather_data, set_weather_data] = useState([]);
    let [today_data, set_today_data] = useState([]);

    //calling the weather data api and storing results in the states above^^
    const query_weather_API = async (location) => {
        //const response = await fetch(`${API_URL}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const data = await response.json()
        
        console.log(data)
        //console.log(data.days[0].temp)
        set_weather_data(data)
        set_today_data(data.days[0])
    }; 
    
    //calling the API query
    useEffect( () => { query_weather_API('London')}, []);


    //methods used in the render method
    let convert_to_Celcius = (f) => { return Math.round((f -32)*(5/9)) }

    const [curr_location, setLocation] = useState('London');
    const handel_locationSelection = (event) =>{
        const value = event.target.value
        setLocation(value)
        console.log(`curr_location = ${value}`) //this still displays the old value of the old selected option?!
        query_weather_API(value)
    }
    
    return(
        <div>
           

            <h2 style={{ textAlign: 'center' }}>{today_data.datetime}</h2>
            <h1>Weather for {curr_location} is </h1>
            <select value={curr_location} onChange={handel_locationSelection}>
                <option value="London">London</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Sydney">Sydney</option>
            </select>

            <h2 style={{ textAlign: 'center' }}>{convert_to_Celcius(today_data.temp)} degrees</h2>
            <h2>which is colder than yesterday</h2>
            <div className="image-container">
                <img src={clouds} style={{ height: 80, width: 80}} alt="clouds icon"/>
            </div>            
        </div>
    )

};

export default WeatherCard;