import './App.css';
import './components/WeatherCard.js';
import WeatherCard from './components/WeatherCard.js';

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
