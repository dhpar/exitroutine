import { FunctionComponent, use, useEffect, useState } from "react";
import { Card } from "../Card";
import { fetchWeatherApi } from "openmeteo";
import { Temporal } from '@js-temporal/polyfill';
import { getDate, getNextMonday, getToday } from "../../utils/Scheduler";
import Error from "next/error";

interface IForecast {
    day: number;
    startDate: Temporal.PlainDateTime | Temporal.PlainDate

}

export const Forecast:FunctionComponent<IForecast> = () => {
    const openMeteoApiurl = "https://api.open-meteo.com/v1/forecast";
    const { day } = getDate();
    const endDate = Temporal.Now.plainDateISO().add({days: 1});
    const startDate = day === 5 || day === 6 || day === 7? getNextMonday(Temporal.Now.plainDateISO()) : getToday();
   
    const [position, setPosition] = useState<{lat?: number, lon?: number}>();
    const [positionError, setPositionError] = useState<error>();

    useEffect(() => {
        if(!navigator.geolocation) {
            return;
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            try{
                if(position){
                    setPosition({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }); 
                }    
            } catch (e) {
                setPositionError(e);
            }
        });
    }, [navigator]);

    if(positionError) {
        return <>Can't</>
    }
    const [ response, ...rest ] = use(
        fetchWeatherApi(
            openMeteoApiurl, 
            {
                "latitude": position..latitude,
                "longitude": location.longitude,
                "daily": [
                    "weather_code", 
                    "apparent_temperature_max", 
                    "apparent_temperature_min", 
                    "sunrise", 
                    "sunset", 
                    "precipitation_probability_max", 
                    "wind_speed_10m_max"
                ],
                "start_date": Temporal.Now.plainDateISO(),
                "end_date": endDate,   
            }
        )
    );


    const hourly = response.hourly()!;
    const daily = response.daily()!;
  
    const precipitation = hourly?.variables(2)!.valuesArray()![0].toFixed(0);
    const apparentTemperatureMax = daily?.variables(1)!.valuesArray()![0].toFixed(0) ?? 'Error loading';
    const apparentTemperatureMin = daily?.variables(2)!.valuesArray()![0].toFixed(0) ?? 'No data available';

    return (
        <Card title="Forecast">
            <ul>
                <li>
                    <p className="text-cyan-500 text-2xl">{startDate.toString()}</p>
                </li>
                <li>
                    <p className="text-cyan-500 text-2xl">{endDate.toString()}</p>
                </li>
                <li>
                    <p className="text-cyan-500 text-2xl">
                        {apparentTemperatureMax} <span className="text-base">F</span>
                    </p>
                </li>
                <li>
                    <p className="text-cyan-500 text-2xl">
                        {apparentTemperatureMin} <span className="text-base">F</span>
                    </p>
                </li>
                { precipitation ? <li>
                    <p className="text-cyan-500 text-2xl">
                        {precipitation} <span className="text-base">Inches</span>
                    </p>
                </li> : null }
            </ul>
        </Card>
    );
};