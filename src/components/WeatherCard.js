import React from 'react';
import clouds from "../icons/clouds.svg";

const WeatherCard = () => {

    return(
        <div>
            <h1>Weather for today is</h1>
            <h2>9 degrees</h2>
            <h2>which is colder than yesterday</h2>
            <div className="image-container">
                <img src={clouds} style={{ height: 80, width: 80}} alt="clouds icon"/>
            </div>            
        </div>
    )

}

export default WeatherCard;