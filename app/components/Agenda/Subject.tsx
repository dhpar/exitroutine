import { isInTimeWindow, isPlainTime, isTodayASection, sortInstantStrings } from "@/utils/Scheduler";
import { Temporal } from "@js-temporal/polyfill";
import { FunctionComponent, useState, useEffect } from "react";
import { TDay } from "../Card/Card";
import data from './aday.json';
import { TDaySchema } from '@/components/Agenda/day';

export interface IScheduleItem {
    startTime: Temporal.PlainTime | string,
    endTime: Temporal.PlainTime | string,
    courseName: string | string
}

const FIXED_SCHEDULE: IScheduleItem[] = [
    {
        startTime: Temporal.PlainTime.from({hour: 8, minute: 50}),
        endTime: Temporal.PlainTime.from({hour: 9, minute: 20}),
        courseName: 'BUS'
    },
    {
        startTime: Temporal.PlainTime.from({hour: 12, minute: 10}),
        endTime: Temporal.PlainTime.from({hour: 12, minute: 40}),
        courseName: 'LUNCH'
    },
    {
        startTime: Temporal.PlainTime.from({hour: 16, minute: 5}),
        endTime: Temporal.PlainTime.from({hour: 16, minute: 25}),
        courseName: 'BUS'
    }
];

export const Subjects:FunctionComponent<{dayType:TDay}> = ({dayType}) => {
    const getCurrentTime = () => Temporal.Now;
    const [ currentTime, setCurrentTime ] = useState(getCurrentTime); 
    
    const listItemtyles = {
        primary: 'p-2',
        current: 'text-xl border-solid border-blue-200 border-2 m-2 bg-slate-300 text-blue-700'
    }
    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime);
        }, 60000); // Update every minute (1000 miliseconds * 60 seconds/min)

        return () => clearInterval(intervalId);
    },[]);

    const sortedAgenda = (data as TDaySchema[])
        .flatMap((day) => day.sectionPlacements
            .filter((section) => {
                // There are elements on the data that don't have a start time (or end time) those are items that tipically are not school subjects per se, we filter
                const startTime = typeof section.startTime === 'string' ?
                    Temporal.PlainTime.from(section.startTime) : null;

                const endTime = typeof section.endTime === 'string' ?
                    Temporal.PlainTime.from(section.endTime) : null;
                
                if(
                    isInTimeWindow(
                        date, 
                        Temporal.PlainDateTime.from(section.startDate), 
                        Temporal.PlainDateTime.from(section.endDate)
                    ) && 
                    isTodayASection(section, dayType) &&
                    startTime && 
                    endTime
                ) {
                    return ({
                        startTime,
                        endTime,
                        courseName: section.courseName
                    });
                }
            })
        );
        
    // const current = Temporal.PlainTime.from(currentTime).toString()
    return ([...FIXED_SCHEDULE, ...sortedAgenda] as IScheduleItem[])
        .sort(sortInstantStrings)
        .map(({startTime, endTime, courseName}, i) => {
            const startTimeNormalized = isPlainTime(startTime)? 
                startTime.toLocaleString() : 
                Temporal.PlainTime.from(startTime).toLocaleString(); 
            const endTimeNormalized = isPlainTime(endTime)? 
                endTime.toLocaleString() : 
                Temporal.PlainTime.from(endTime).toLocaleString();

            return <li className={`${listItemtyles.primary} ${isInTimeWindow(currentTime.plainTimeISO(), startTime, endTime) ? listItemtyles.current : ''}`} key={i}>
                <p className="grid grid-cols-2 grid-rows-2 items-center">
                    <span className="col-start-1 col-end-2 row-start-1 row-end-2">{startTimeNormalized}</span> 
                    <span className="col-start-1 col-end-2 row-start-2 row-end-3">{endTimeNormalized}</span> 
                    <span className="col-start-2 col-end-3 row-start-1 row-end-3 justify-self-end">{courseName}</span>
                </p>
            </li>
        })
};