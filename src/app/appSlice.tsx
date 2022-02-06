//import { debounce } from 'lodash';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch } from './store';
import { fetchCurrentWeather } from '../features/Current/current.slice';
import { fetchForecastWeather } from '../features/Forecast/forecast.slice';
import {debounce} from "./functions/denounce";

export const useHandleSearchChange = () => {
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useAppDispatch();

  const fetchWeatherData = useCallback(
    (searchCity: string) => {
      dispatch(fetchCurrentWeather(searchCity));
      dispatch(fetchForecastWeather(searchCity));
    },
    [dispatch],
  );

  const search = useMemo(
    () =>
      debounce((serachText: string) => {
        let searchCity = serachText ? serachText : 'Brisbane,AU';
        fetchWeatherData(searchCity);
      }, 1000),
    [fetchWeatherData],
  );
  useEffect(() => {
    return () => {
      //search.cancel();
    };
  }, [search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCity = event.currentTarget.value;
    setSearchCity(searchCity);
    search(searchCity);
  };
  useEffect(() => {
    dispatch(fetchCurrentWeather('Brisbane,AU'));
    dispatch(fetchForecastWeather('Brisbane,AU'));
  }, [dispatch]);

  return { searchCity, handleSearchChange };
};
