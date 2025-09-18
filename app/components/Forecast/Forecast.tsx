"use client"
import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { useLocation } from "@/hooks/useLocation";
import { CardLoading } from "../Card/CardLoading";
import { getWeather, IWeatherResponse } from "@/api/forecast/getForecast";
import { useDates } from "@/providers";
import { ApiError } from "next/dist/server/api-utils";
import { CardError } from "../Card/CardError";

export const Forecast:FunctionComponent = () => {
    const { state: { date, dd, mm, yyyy} } = useDates();
    const position = useLocation();
    const [ forecast, setForecast ] = useState<IWeatherResponse | null>(null);
    const [ isLoading, setLoading ] = useState(true);
    const [ error, setError ] = useState<ApiError>();
    const hasPosition = 
        !!position.lat && !!position.lon && 
        typeof position.lat === 'number' && typeof position.lon === 'number' &&
        position.lat !== 0 && position.lon !== 0;

    useEffect(() => {
        if(!hasPosition){
            return;
        }
        getWeather({
            lat: position.lat, 
            lon: position.lon
        }, `${yyyy}-${mm}-${dd}`)
            .then(resp => {
                setLoading(true);
                setForecast(resp);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [hasPosition, date]);
    
    if(isLoading)  return <CardLoading />
    if(error?.statusCode && error?.statusCode !== 200) return <CardError {...error} />

    return (
        <Card title="Forecast">
            <ul data-testid="forecast" className="flex justify-around gap-4">
                <li className="text-cyan-500 text-2xl">
                    {forecast?.WeatherIcon?.Icon}
                    <span className="text-base ml-2">
                        {forecast?.WeatherIcon.label}
                    </span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Max Temp */}
                    {forecast?.maxTemp} 
                    <span className="text-base"> F</span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Min Temp */}
                    {forecast?.minTemp} 
                    <span className="text-base"> F</span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Precipitation */}
                    {forecast?.precipitation} 
                    <span className="text-base"> Inches</span>
                </li>
            </ul>
        </Card>
    );
};