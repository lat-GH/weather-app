import logo from './logo.svg';
import './App.css';
import './WeatherCard.js';
import WeatherCard from './WeatherCard.js';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <WeatherCard/>
      </div>      
    </div>
  );    
    
}

export default App;
