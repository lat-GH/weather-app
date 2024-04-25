import './App.css';
//import './components/WeatherCard.js';
//import WeatherCard from './components/WeatherCard.js';
import WeatherCard from './components/WeatherCard.js';
import WeatherCard_pretty from './components/WeatherCard_pretty.js';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <WeatherCard_pretty/>
      </div>      
    </div>
  );    
    
}

export default App;
