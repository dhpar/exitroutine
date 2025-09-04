import { FunctionComponent, JSX } from "react";
// import { error } from "console";
import CloudDrizzle from "@assets/icons/cloud-drizzle.svg";
import CloudLightning from "@assets/icons/cloud-lightning.svg";
import CloudRain from "@assets/icons/cloud-rain.svg";
import CloudSnow from "@assets/icons/cloud-snow.svg";
import Cloud from "@assets/icons/cloud.svg";
import Sun from "@assets/icons/sun.svg";
import Umbrella from "@assets/icons/umbrella.svg";
import Wind from "@assets/icons/wind.svg";
import AlertCircle from "@assets/icons/alert-circle.svg"

interface IWeatherCodeItem {
    code: number;
    label: string;
    color: string;
    Icon?: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const forecastIcons = (code: number) => {
    
    const iconProps = {
        className: `h-5 w-5 inline-block`,
        "aria-hidden": true,
        focusable: false,
        role: "img",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        height: "24",
        width: "24",
    };

    return [
        {
            code: 0,
            label: 'Clear',
            color: 'slate-300',
            Icon: <Sun {...iconProps} />
        },
        {
            code: 1,
            label: 'Mostly Clear',
            color: 'slate-250',
            Icon: <Sun {...iconProps} />
        },
        {
            code: 2,
            label: 'Partly Cloudy',
            color: 'slate-350',
            Icon: <Cloud {...iconProps} />
        },
        {
            code: 3,
            label: 'Overcast',
            color: 'slate-450',
            Icon: <Cloud {...iconProps} />
        },
        {
            code: 45,
            label: 'Fog',
            color: 'grey-350',
            Icon: <Cloud {...iconProps} />
        },
        {
            code: 48,
            label: 'Icy Fog',
            color: 'grey-550',
            Icon: <Cloud {...iconProps} />
        },
        // Rains
        {
            code: 51,
            label: 'Light Drizzle',
            color: 'blue-200',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 53,
            label: 'Drizzle',
            color: 'blue-300',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 55,
            label: 'Heavy Drizzle',
            color: 'blue-400',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 56,
            label: 'Light Freezing Drizzle',
            color: 'sky-500',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 57,
            label: 'Icy Drizzle',
            color: 'sky-600',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 61,
            label: 'Slight Rain',
            color: 'blue-500',
            Icon: <CloudDrizzle {...iconProps} />
        },
        {
            code: 63,
            label: 'Rain',
            color: 'blue-600',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 65,
            label: 'Heavy Rain',
            color: 'blue-700',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 66,
            label: 'Light Icy Rain',
            color: 'blue-800',
            Icon: <CloudRain {...iconProps} />
            
        },
        {
            code: 67,
            label: 'Heavy Icy Rain',
            color: 'blue-900',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 71,
            label: 'Light Snow',
            color: 'slate-100',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 73,
            label: 'Snow',
            color: 'slate-200',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 75,
            label: 'Heavy Snow',
            color: 'slate-300',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 77,
            label: 'Snow Grains',
            color: 'slate-400',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 80,
            label: 'Light Showers',
            color: 'slate-500',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 81,
            label: 'Showers',
            color: 'slate-600',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 82,
            label: 'Heavy Showers',
            color: 'slate-700',
            Icon: <CloudRain {...iconProps} />
        },
        {
            code: 85,
            label: 'Light Snow Showers',
            color: 'slate-800',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 86,
            label: 'Heavy Snow Showers',
            color: 'slate-900',
            Icon: <CloudSnow {...iconProps} />
        },
        {
            code: 95,
            label: 'Thunderstorm',
            color: 'red-500',
            Icon: <CloudLightning {...iconProps} />
        },
        {
            code: 96,
            label: 'Thunderstorm with Hail',
            color: 'red-600',
            Icon: <CloudLightning {...iconProps} />
        },
        {
            code: 99,
            label: 'Thunderstorm with Heavy Hail',
            color: 'red-700',
            Icon: <CloudLightning {...iconProps} />
        },
        {
            code: -1,
            label: "Error",
            color: 'red-700',
            Icon: <AlertCircle {...iconProps} />
        }
    ].find(
        weatherCodeItem => weatherCodeItem.code === code
    ) || {
        code: 0,
        label: 'Clear',
        color: 'slate-300',
        Icon: <Sun {...iconProps} />
    };
};