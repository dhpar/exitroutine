"use server"
import { forecastIcons } from '@/components/Forecast/ForecastIcons';
import { Temporal } from '@js-temporal/polyfill';
import { fetchWeatherApi } from 'openmeteo';
import { JSX } from 'react';

interface IPosition {
  lat: number;
  lon: number;
}

interface IWeatherIcon {
  code: number;
  label: string;
  color: string;
  Icon: JSX.Element;
}

export interface IWeatherResponse {
  WeatherIcon: IWeatherIcon,
  maxTemp: string,
  minTemp: string,
  precipitation: string
}

export const getWeather = async (position: IPosition, 
  endDate: string): Promise<IWeatherResponse> => {
    'use server'
    const responses = await fetchWeatherApi(
    "https://api.open-meteo.com/v1/forecast", 
    {
        "latitude": position.lat,
        "longitude": position.lon,
        "temperature_unit": "fahrenheit",
        "daily": [
            "weather_code", 
            "apparent_temperature_max", 
            "apparent_temperature_min", 
            "precipitation_probability_max"
        ],
        "start_date": Temporal.Now.plainDateISO(),
        "end_date": endDate,   
    }
  );
  
  // Helper function to form time ranges
  const response = responses[0];
  const daily = response.daily()!;
  const getVariable = (index: number) => 
      daily.variables(index)!.valuesArray()![0];
  const WeatherIcon = forecastIcons(getVariable(0));

  return {
    WeatherIcon,
    maxTemp: getVariable(1).toFixed(0),
    minTemp: getVariable(2).toFixed(0),
    precipitation: getVariable(3).toFixed(0)
  }
}

