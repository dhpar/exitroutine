import { IMenuResponse } from '@/api/menu/getSchoolMenu.types';
import { forecastIcons } from '@/components/Forecast/ForecastIcons';
import { pad } from '@/utils/utils';
import { Temporal } from '@js-temporal/polyfill';
import ical from 'ical';
import { fetchWeatherApi } from 'openmeteo';
import { JSX } from 'react';

const SCHOOL = 'valley-view';  

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

export async function fetchMenu (yyyy: string, mm: string, dd: string):Promise<IMenuResponse> { 
  return await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/${SCHOOL}/menu-type/lunch/${yyyy}/${pad(mm)}/${pad(dd)}/`)
    .then(resp => resp.json())
}

export async function fetchCalendar() {
  const fetchCalendar = await fetch('https://valleyview.edinaschools.org/cf_calendar/feed.cfm?type=ical&feedID=480A95723BF64AF6A939E3131C04210A', {
      method: 'GET',
      headers: {
          'Content-Type': 'text/calendar',
      },
  });
  const calendarText = await fetchCalendar.text();
  return Object.values(ical.parseICS(calendarText));
}

export async function fetchSchoologyCalendar(yyyy: string, mm: string, dd: string) {
  debugger;
  return await fetch(`https://edinaschools.infinitecampus.org/campus/resources/portal/roster?_expand=%7BsectionPlacements-%7Bterm%7D%7D&_date=${yyyy}-${mm}-${dd}&personID=21927`, {
      method: 'GET',
      referrer: "https://edinaschools.infinitecampus.org/campus/apps/portal/parent/calendar",
      mode: "cors",
      credentials: "include",
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,ca-ES;q=0.8,ca;q=0.7,es-ES;q=0.6,es;q=0.5",
        "cache-control": "no-cache",
        "expires": "0",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      }
  })
    .then(resp => resp.json());
} 

// For endDate needs a date with the following format: yyyy-mm-dd, with leading zeros (2025-02-02)
export const fetchWeather = async ({lat, lon}: IPosition, endDate: string): Promise<IWeatherResponse> => {
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
