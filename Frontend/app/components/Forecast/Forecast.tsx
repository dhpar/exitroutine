import { FunctionComponent, use, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { useLocation } from "@/hooks/useLocation";
import { CardLoading } from "../Card/CardLoadng";
import { getWeather, IWeatherResponse } from "@/actions/getForecast";

export const Forecast:FunctionComponent<{day: string}> = ({day}) => {
    const position = useLocation();
    const [ forecast, setForecast ] = useState<IWeatherResponse | null>(null);
    const hasPosition = 
        !!position.lat && !!position.lon && 
        typeof position.lat === 'number' && typeof position.lon === 'number' &&
        position.lat !== 0 && position.lon !== 0;
  
    useEffect(() => {
        if(!hasPosition){
            return;
        }
        getWeather({lat: position.lat, lon: position.lon}, day).then(setForecast);
    
    }, [hasPosition]);
    
    if(!forecast) {
        return <CardLoading />
    }
    
    return (
        <Card title="Forecast">
            <ul data-testid="forecast" className="grid grid-cols-2 gap-4">
                <li className="text-cyan-500 text-2xl">
                    {forecast?.WeatherIcon?.Icon}
                    <span className="text-base block ml-2">
                        {forecast?.WeatherIcon.label}
                    </span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Max Temp */}
                    {forecast?.maxTemp} 
                    <span className="text-base"> F</span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Precipitation */}
                    {forecast?.precipitation} 
                    <span className="text-base"> Inches</span>
                </li>
                <li className="text-cyan-500 text-2xl">
                    {/* Min Temp */}
                    {forecast?.minTemp} 
                    <span className="text-base"> F</span>
                </li>
            </ul>
        </Card>
    );
};