import { fetchWeatherApi } from 'openmeteo';

export const getWeather = async () => {
  const responses = await fetchWeatherApi(
    "https://api.open-meteo.com/v1/forecast", {
      "latitude": 44.9247,
      "longitude": -93.3344,
      "hourly": ["temperature_2m", "apparent_temperature", "precipitation"],
      "daily": ["apparent_temperature_max", "apparent_temperature_min"],
      "temperature_unit": "fahrenheit",
      "wind_speed_unit": "mph",
      "precipitation_unit": "inch",
      "forecast_hours": 24,
      "models": "gfs_seamless"
    }
  );
  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  return {
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      apparentTemperature: hourly.variables(1)!.valuesArray()!,
      precipitation: hourly.variables(2)!.valuesArray()!,
    },
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      apparentTemperatureMax: daily.variables(0)!.valuesArray()!,
      apparentTemperatureMin: daily.variables(1)!.valuesArray()!,
    },
  }
}

