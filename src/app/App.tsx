import React from 'react';
import './App.scss';
import Current from '../features/Current';
import Forecast from '../features/Forecast';
import { useHandleSearchChange } from './appSlice';

const App = () => {
  const { searchCity, handleSearchChange } = useHandleSearchChange();
  return (
    <div className="App">
      <div className="App__Search">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="searchCity"
            data-testid="searchCity"
            value={searchCity}
            onChange={handleSearchChange}
            placeholder="search, for example 'Brisbane,AU'"
          />
        </div>
      </div>
      <div className="App__WeatherWrapper">
        <div className="App__WeatherCurrent">
          <Current />
        </div>
        <div className="App__WeatherForecast">
          <Forecast />
        </div>
      </div>
    </div>
  );
};

export default App;
