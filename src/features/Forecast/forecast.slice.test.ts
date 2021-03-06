import WeatherbitApp from '../../services/WeatherbitApp';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchForecastWeather } from './forecast.slice';
import { mockForecast } from '../../mocks/forecast';

jest.mock('../../services/WeatherbitApp.ts');
const mockedWeatherbitApp = WeatherbitApp as jest.Mocked<typeof axios>;

describe('forecast weather slice', () => {
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  const mockResponse = {
    data: {
      data: mockForecast,
    },
  };
  const mockStore = configureStore({
    reducer: {
      forecast: reducer,
    },
  });
  it('fetch forecast success', async () => {
    mockedWeatherbitApp.get.mockResolvedValue(mockResponse);
    await mockStore.dispatch(fetchForecastWeather('Brisbane, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/forecast/daily', {
      params: { city: 'Brisbane, AU' },
    });
    const state = mockStore.getState();
    expect(state.forecast).toEqual({
      data: mockForecast,
      error: null,
      loading: false,
    });
  });
  it('fetch forecast failed with 404', async () => {
    mockedWeatherbitApp.get.mockResolvedValue({ data: [] });
    await mockStore.dispatch(fetchForecastWeather('Brisbane, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/forecast/daily', {
      params: { city: 'Brisbane, AU' },
    });
    const state = mockStore.getState();
    expect(state.forecast).toEqual({
      data: [],
      error: {
        code: 404,
        message: 'Weather data not found',
      },
      loading: false,
    });
  });
  it('fetch forecast failed with other errors', async () => {
    mockedWeatherbitApp.get.mockRejectedValue({
      response: {
        status: 500,
      },
      message: 'unknown error',
    });
    await mockStore.dispatch(fetchForecastWeather('Brisbane, AU'));
    expect(mockedWeatherbitApp.get).toBeCalledWith('/forecast/daily', {
      params: { city: 'Brisbane, AU' },
    });
    const state = mockStore.getState();
    expect(state.forecast).toEqual({
      data: [],
      error: {
        code: 500,
        message: 'unknown error',
      },
      loading: false,
    });
  });
  it('set loading true when start fetching forecast', () => {
    const action = { type: fetchForecastWeather.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: true,
      data: [],
      error: null,
    });
  });
  it('set data when fetching forecast successfully', () => {
    const action = {
      type: fetchForecastWeather.fulfilled.type,
      payload: mockForecast,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: mockForecast,
      error: null,
    });
  });
  it('set known error when fetching forecast failed', () => {
    const action = {
      type: fetchForecastWeather.rejected.type,
      payload: {
        code: 404,
        message: 'not found',
      },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: [],
      error: {
        code: 404,
        message: 'not found',
      },
    });
  });
  it('set unknown error when fetching forecast failed', () => {
    const action = {
      type: fetchForecastWeather.rejected.type,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      data: [],
      error: {
        code: 500,
        message: 'unknown error',
      },
    });
  });
});
