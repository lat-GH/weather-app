import React from 'react';
import clouds from "../icons/clouds.svg";

import { useEffect, useState} from 'react';


const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_key = "key=AGX6UGDFKCDXBXR42836HWC4L";
//let location = 'london'

const WeatherCard = () => {

    const query_weather_API = async (location) => {
        //const response = await fetch(`${API_URL}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const data = await response.json()
        
        console.log(data)
        //console.log(data.days[0].temp)
        set_weather_data(data)
        set_today_data(data.days[0])
    };
    
    
    let [weather_data, set_weather_data] = useState([]);
    let [today_data, set_today_data] = useState([]);
    let location = 'paris'
    useEffect( () => { query_weather_API(location)}, []);

    let convert_to_Celcius = (f) => { return Math.round((f -32)*(5/9)) }


    const [curr_location, setLocation] = useState('London');
    const handelChange = (event) =>{
        setLocation(event.target.value)
        console.log(`curr_location = ${curr_location}`)
    }
    
    return(
        <div>
            <select value={curr_location} onChange={handelChange}>
                <option value="London">London</option>
                <option value="Paris">Paris</option>
                <option value="Sydney">Sydney</option>
            </select>

            <h2 style={{ textAlign: 'right' }}>{today_data.datetime}</h2>
            <h1>Weather for {curr_location} is </h1>
            <h2>{convert_to_Celcius(today_data.temp)} degrees</h2>
            <h2>which is colder than yesterday</h2>
            <div className="image-container">
                <img src={clouds} style={{ height: 80, width: 80}} alt="clouds icon"/>
            </div>            
        </div>
    )

};

export default WeatherCard;