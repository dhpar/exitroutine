import { fetchWeatherApi } from "openmeteo";

const url = "https://edinaschools.api.nutrislice.com";
const schoolId = "normandale";
const menuType = "lunch";
const fetchUrl = (date:string) => new URL(`${url}/menu/api/weeks/school/${schoolId}/menu-type/${menuType}/${date}/`);
const method = "GET";
const headers = new Headers(
    {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": url,
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
    }
);

const routes = {
    requestSchoolMenu: (day:string) => new Request(fetchUrl(day), { method, headers }),
    requestForecast: (latitude:number, longitude:number, startDate:string, endDate:string) => {
        const openMeteoApiurl = "https://api.open-meteo.com/v1/forecast";
        return fetchWeatherApi(
            openMeteoApiurl, 
            {
                "latitude": latitude,
                "longitude": longitude,
                "daily": [
                    "weather_code", 
                    "apparent_temperature_max", 
                    "apparent_temperature_min", 
                    "sunrise", 
                    "sunset", 
                    "precipitation_probability_max", 
                    "wind_speed_10m_max"
                ],
                "start_date": startDate,
                "end_date": endDate,   
            }
        );
    }
};