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

// For endDate needs a date with the following format: yyyy-mm-dd, with leading zeros (2025-02-02)
export const getWeather = async ({lat, lon}: IPosition, endDate: string): Promise<IWeatherResponse> => {
  const responses = await fetchWeatherApi(
    "https://api.open-meteo.com/v1/forecast", 
    {
        "latitude": lat,
        "longitude": lon,
        "temperature_unit": "fahrenheit",
        "daily": [
            "weather_code", 
            "apparent_temperature_max", 
            "apparent_temperature_min", 
            "precipitation_probability_max"
        ],
        "start_date": Temporal.PlainDate.from(endDate),
        "end_date": Temporal.PlainDate.from(endDate).add({days: 1}),   
    }, 
  );
  
  // Helper function to form time ranges, the index follows the order in which the different parameters where requested.
  // ie: for ```"daily": ["weather_code", "apparent_temperature_max"]```, we need to use the index = 0 for the weather code.
  const getVariable = (index: number) => responses[0].daily()!.variables(index)!.valuesArray()![0];
  
  return {
    WeatherIcon: forecastIcons(getVariable(0)),
    maxTemp: getVariable(1).toFixed(0),
    minTemp: getVariable(2).toFixed(0),
    precipitation: getVariable(3).toFixed(0)
  }
}

