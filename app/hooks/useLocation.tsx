'use client';
import { useState, useEffect } from "react";

interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
}
interface GeolocationPosition {
    coords: GeolocationCoordinates;
    timestamp: number;
}

interface GeolocationPositionError {
    code: number;
    message: string;
    PERMISSION_DENIED: 1;
    POSITION_UNAVAILABLE: 2;
    TIMEOUT: 3;
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
  
const error = (err: GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

export const useLocation = () => {
    const [position, setPosition] = useState({
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
                console.log({coords});
                setPosition({ 
                    lat: coords.latitude, 
                    lon: coords.longitude
                });
            }, 
            error, 
            options
        );
    }, []);

    return position;
}