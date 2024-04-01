import React from 'react';
import clouds from "../icons/clouds.svg";
import rain from "../icons/rain.svg";
import snow from "../icons/snow.svg";
import sun from "../icons/sun.svg";
import wind from "../icons/wind.svg";
import part_cloudy from "../icons/part_cloudy.svg";


import { useEffect, useState} from 'react';
import { Difference, X } from '@mui/icons-material';


//const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_key = "key=AGX6UGDFKCDXBXR42836HWC4L";

const WeatherCard_02 = () => {

    //weather data states
    let [curr_location, setLocation] = useState('London');
    //let [weather_data, set_weather_data] = useState([]);
    let [today_data, set_today_data] = useState([]);
    let [today_temp, set_today_temp] = useState([]);
    let [yesterday_data, set_yesterday_data] = useState([]);
    let [yesterday_temp, set_yesterday_temp] = useState([]);
    //let [warmer_or_colder, set_warmerORcolder] = useState([0]);
    let [warmer_or_colder_str, set_warmerORcolder_str] = useState([]);
    let [temp_colour, set_tempColour] = useState(['green']);
    let [icon_svg, set_icon_svg] = useState(clouds)
    

    //calling the weather data api and storing results in the states above^^
    const query_weather_API = async (curr_location) => {
        //const response = await fetch(`${API_URL}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${curr_location}?unitGroup=us&include=days&${API_key}&contentType=json`)
        const data = await response.json()
        
        const response02 = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${curr_location}/yesterday?unitGroup=us&${API_key}&contentType=json`)
        const data02 = await response02.json()

        console.log(data02)
        console.log(data)
        //console.log(data.days[0].temp)
        //set_weather_data(data)
        set_today_data(data.days[0])
        set_yesterday_data(data02.days[0])
        //console.log("data.days[0].icon = "+data.days[0].icon)
        
    }; 
    

     //methods used in the render method
     let convert_to_Celcius = (f) => { return Math.round((f -32)*(5/9)) }

    //handles when a new location is chosen
    const handel_locationSelection = (event) =>{
        const value = event.target.value
        setLocation(value)
        console.log(`curr_location = ${value}`) //this still displays the old value of the old selected option?!
    }

    //calculates if the temperature 'today' is a little warmer, warmer or a lot hotter 
    const warmerORcolder_calculator = () =>{
        set_yesterday_temp(convert_to_Celcius(yesterday_data.temp))
        set_today_temp(convert_to_Celcius(today_data.temp))
        const difference = today_temp - yesterday_temp

        console.log(`yesterday = ${yesterday_temp} today = ${today_temp} differenece = ${difference}`)
        //same as
        if(difference === 0){
            //set_warmerORcolder(0)
            set_tempColour('green')
            set_warmerORcolder_str("feels the same")
           
        }
        //colder
        if(difference < 0){
            //set_warmerORcolder(-1)
            set_tempColour('blue')
            if(difference < -3){
                set_warmerORcolder_str("feels a lot colder")

            }else{
                set_warmerORcolder_str("feels a little bit colder")
            }          
        }
        //warmer
        else{
            //set_warmerORcolder(1)
            set_tempColour('red')
            if (difference > 3){
                set_warmerORcolder_str("feels a lot warmer")
            }else{
                set_warmerORcolder_str("feels a little warmer")
            }          
        }
    }

    const choose_weather_icon = (icon_data) => {
        console.log("icon_data ="+icon_data)
        switch(icon_data){
            case 'rain':
                set_icon_svg(rain)
                break;
            case 'partly-cloudy-day':
                set_icon_svg(part_cloudy)
                break;
            case 'wind':
                set_icon_svg(wind)
                break;
            case 'cloudy':
                set_icon_svg(clouds)
                break;
            case 'clear-day':
                set_icon_svg(sun)
                break;
            case 'snow':
                set_icon_svg(snow)
                break;
            default:
                set_icon_svg(clouds)

        }

    }

    //calling to update the states when the curre_location variable 
    //is updated and will trigger a rerender
    useEffect( () => { 
        query_weather_API(curr_location)
        warmerORcolder_calculator()
        choose_weather_icon(today_data.icon)
    }, [curr_location]); 

    return(
        <div>
            <h2 style={{ textAlign: 'center' }}>{today_data.datetime}</h2>
            <select value={curr_location} onChange={handel_locationSelection}>
                <option value="London">London</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Sydney">Sydney</option>
            </select>
            <h1>Weather for {curr_location} </h1>
            <h2 style={{color: temp_colour}}> {warmer_or_colder_str} than yesterday</h2>

            <h2 style={{ textAlign: 'center' }}>{convert_to_Celcius(today_data.temp)} degrees</h2>
            
            <div className="image-container">
                <img src={icon_svg} style={{ height: 80, width: 80}} alt="clouds icon"/>
            </div>            
        </div>
    )

};

export default WeatherCard_02;