'use client'
import { FunctionComponent, use, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { Temporal } from '@js-temporal/polyfill';
import { getDate, getNextMonday, getToday } from "../../utils/Scheduler";
import { useLocation } from "@/hooks/useLocation";
import { fetchWeatherApi } from "openmeteo";
import { useQuery } from "@tanstack/react-query";
import { CardLoading } from "../Card/CardLoadng";
import { CardError } from "../Card/CardError";
import Sun from "@public/icons/sun.svg";
import { forecastIcons } from "./ForecastIcons";

interface IPosition {
    lat: number;
    lon: number;
  }
  
export const getWeather = (
    position: IPosition, 
    endDate: Temporal.PlainDate | Temporal.PlainDateTime
  ) =>   
    fetchWeatherApi(
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

export const Forecast:FunctionComponent<{}> = () => {
    const { day } = getDate();
    const startDate = day === 5 || day === 6 || day === 7? 
        getNextMonday(Temporal.Now.plainDateISO()) : 
        getToday();
    const endDate = Temporal.Now.plainDateISO().add({days: 1});
    const [position, setPosition] = useState<IPosition>({
        lat: 0,
        lon: 0
    });

    useEffect(() => {
        const hasGeolocation = "geolocation" in navigator;
        if (!hasGeolocation) { 
            return; 
        }
        
        navigator.geolocation.getCurrentPosition(
            ({coords}: GeolocationPosition) => {
                setPosition({ 
                    lat: coords.latitude, 
                    lon: coords.longitude
                });
            }
        );
    }, []);

    const { 
        isError, 
        isPending, 
        data: responses, 
        error 
    } = useQuery<WeatherApiResponse[]>({
        queryKey: ['weather', position?.lat, position?.lon],
        queryFn: () => getWeather(position, endDate),
        enabled: !!position.lat || !!position.lon,
    });

    if ( isError ) {
        return <CardError message={error.message}/>
    }

    if( isPending ) {
        return <CardLoading />;
    }

    const response = responses[0];
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const WeatherIcon = forecastIcons(daily.variables(0)!.valuesArray()![0]) || {Icon: Sun, label: 'Clear'};
    
    const items = [
        {
            value: 
                <>
                    {WeatherIcon.Icon}
                    <span className="text-base block ml-2">
                        {WeatherIcon.label}
                    </span>
                </> || null,
            unit: '',
            label: 'weather code'
        },
        {
            value: daily?.variables(1)!.valuesArray()![0].toFixed(0),
            unit: 'F',
            label: 'Max Temp'
        },
        {
            value: daily?.variables(2)!.valuesArray()![0].toFixed(0),
            unit: 'F',
            label: 'Min Temp'
        },
        {
            value: daily?.variables(3)!.valuesArray()![0].toFixed(0),
            unit: 'Inches',
            label: 'Precipitation'
        },
    ];

    return (
        <Card title="Forecast">
            <ul  data-testid="forecast">
                {items?.map((item, index) => (
                    <li key={`forecast-${index}`}>
                        <p className="text-cyan-500 text-2xl">
                            
                            {item.value && 
                            <>
                            {item.value} 
                                <span className="text-base"> {item.unit}</span>
                            </>}
                        </p>
                    </li>)
                )}
            </ul>
        </Card>
    );
};