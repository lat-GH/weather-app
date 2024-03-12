import React from 'react';
import clouds from "../icons/clouds.svg";

import { useEffect, useState} from 'react';


const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_key = "key=AGX6UGDFKCDXBXR42836HWC4L";

const WeatherCard = () => {

    const query_weather_API = async () => {
        //const response = await fetch(`${API_URL}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=us&include=days&key=AGX6UGDFKCDXBXR42836HWC4L&contentType=json")
        const data = await response.json()
        
        console.log(data)
        //console.log(data.days[0].temp)
        set_weather_data(data.days[0])
    };
    
    
    let [weather_data, set_weather_data] = useState([]);
    useEffect( () => { query_weather_API()}, []);

    return(
        <div>
            <h1>Weather for {weather_data.datetime} is </h1>
            <h2>{weather_data.temp} degrees</h2>
            <h2>which is colder than yesterday</h2>
            <div className="image-container">
                <img src={clouds} style={{ height: 80, width: 80}} alt="clouds icon"/>
            </div>            
        </div>
    )

};

export default WeatherCard;