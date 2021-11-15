import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from './store';
import { fetchCurrentWeather } from '../features/Current/current.slice';
import { fetchForecastWeather } from '../features/Forecast/forecast.slice';

export const useHandleSearchChange = () => {
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce((serachText: string) => {
      let searchCity = serachText ? serachText : 'Brisbane,AU';
      dispatch(fetchCurrentWeather(searchCity));
      dispatch(fetchForecastWeather(searchCity));
    }, 1000),
    [],
  );
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
