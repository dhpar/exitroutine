import { forecastIcons } from '@/components/Forecast/ForecastIcons';
import { getToday } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';
import { NextRequest } from 'next/server';
import { fetchWeatherApi } from 'openmeteo';
 
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat'); // e.g. `/api/forecast?lat=123&lon=456`
    const lon = searchParams.get('lon');
    const endDate = Temporal.PlainDate.from(searchParams.get('endDate') || getToday); // e.g. `/api/forecast?lat=123&lon=456&endDate=2023-10-01`

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
            "start_date": endDate,
            "end_date": endDate.add({days: 1}),   
        }, 
    );
    // Helper function to form time ranges, the index follows the order in which the different parameters where requested.
    // ie: for ```"daily": ["weather_code", "apparent_temperature_max"]```, we need to use the index = 0 for the weather code.
    const getVariable = (index: number) => responses[0].daily()!.variables(index)!.valuesArray()![0];
    const weatherObject= {
        WeatherIcon: getVariable(0),
        maxTemp: getVariable(1).toFixed(0),
        minTemp: getVariable(2).toFixed(0),
        precipitation: getVariable(3).toFixed(0)
    }
    const weatherHeaders = {
        'Content-Type': 'application/json',
    };
    return new Response( JSON.stringify(weatherObject),
        {
            headers: weatherHeaders,
            status: 200,
            statusText: 'OK',
        },
    );
}
