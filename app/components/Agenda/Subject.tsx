import { useDates } from "@/providers";
import { sortInstantStrings } from "@/utils/Scheduler";
import { Temporal } from "@js-temporal/polyfill";
import { FunctionComponent, useState, useEffect, Fragment } from "react";
import { TDay } from "../Card/Card";
import { TSectionPlacements, TDaySchema } from "./day";
import data from './aday.json';

export interface IScheduleItem {
    startTime: Temporal.PlainTime,
    endTime: Temporal.PlainTime,
    courseName: string
}

const LAUNCH:IScheduleItem = {
    startTime: Temporal.PlainTime.from({hour: 12, minute: 10}),
    endTime: Temporal.PlainTime.from({hour: 12, minute: 40}),
    courseName: 'LAUNCH'
}

const busPickUp:IScheduleItem = {
    startTime: Temporal.PlainTime.from({hour: 8, minute: 50}), 
    endTime: Temporal.PlainTime.from({hour: 9, minute: 20}), 
    courseName: 'BUS'
};

const busDropOff:IScheduleItem = {
    startTime: Temporal.PlainTime.from({hour: 4, minute: 5}), 
    endTime: Temporal.PlainTime.from({hour: 4, minute: 25}), 
    courseName: 'BUS'
}

const plainTimeConfig = {
    hour: '2-digit',
    minute: '2-digit'
}

function isInTimeWindow<T extends Temporal.PlainDateTime | Temporal.PlainDateTimeLike> (one: T, windowOne: T, windowtwo: T): boolean  {

    const isAfterStartDate = 'year' in one?
            Temporal.PlainDateTime.compare(one, windowOne) >= 0 : Temporal.PlainTime.compare(one, windowOne) >= 0;
    const isBeforeEndDate = 'year' in one?
            Temporal.PlainDateTime.compare(one, windowtwo) <= 0 : Temporal.PlainTime.compare(one, windowtwo) <= 0;

    return isAfterStartDate && isBeforeEndDate;
}

const isInTerm = (section:TSectionPlacements) => {
    const { state: { date } } = useDates();

    return isInTimeWindow(date, Temporal.PlainDateTime.from(section.startDate), Temporal.PlainDateTime.from(section.endDate));
} 

const isTodayASection = (section:TSectionPlacements, dayType: TDay) =>  dayType.toLowerCase() === section.periodScheduleName.toLowerCase();
const isPlainTime = (time:any): time is Temporal.PlainTime => time instanceof Temporal.PlainTime;  
export const Subjects:FunctionComponent<{dayType:TDay}> = ({dayType}) => {
    const [ currentTime, setCurrentTime ] = useState(Temporal.Now.plainTimeISO()); 

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCurrentTime(Temporal.Now.plainTimeISO());
        }, 60000); // Update every minute (1000 miliseconds * 60 seconds/min)

        return () => clearInterval(intervalId);
    },[]);

    const sortedAgenda = (data
        .flatMap(day => (day.sectionPlacements as TSectionPlacements[])
            .filter(section => {
                const hasStartTime = Boolean(section.startTime) && section.startTime !== 'undefined';
                const hasEndTime = section.endTime && section.endTime !== undefined
                if (
                    !isInTerm(section) || !isTodayASection(section, dayType) || !section.startTime || section.startTime === undefined || !section.endTime || section.endTime === undefined) {
                    return false;
                }
                return {
                    startTime: Temporal.PlainTime.from(section.startTime),
                    endTime: Temporal.PlainTime.from(section.endTime),
                    courseName: section.courseName
                };
            })
        ) as unknown as IScheduleItem[])
        .sort((a, b) => sortInstantStrings(a, b));

    const finalAgenda = [ busPickUp, ...sortedAgenda, busDropOff ].map(
        ({startTime, endTime, courseName}, i) => {
           
            if(!startTime || !endTime) return null;
            
            const startTimeNormalized = isPlainTime(startTime)? startTime : Temporal.PlainTime.from(startTime); 
            const endTimeNormalized = isPlainTime(endTime)? endTime : Temporal.PlainTime.from(endTime);

            const currentSubjectStyle = startTime && endTime && isInTimeWindow(currentTime, startTimeNormalized, endTimeNormalized)? 
                    'text-xl border-solid border-blue-200 border-2 m-2 p-2 bg-slate-300 text-blue-700' : 'p-2';
 
            if(isInTimeWindow(LAUNCH.startTime, startTimeNormalized, endTimeNormalized)) {
                return <Fragment key={i}>
                     <li className={currentSubjectStyle}>
                         <p>{LAUNCH.startTime.toString()} to {LAUNCH.endTime.toString()} - {LAUNCH.courseName}</p>
                     </li>
                    <li className={currentSubjectStyle}>
                         <p>{startTime.toLocaleString()} to {endTime.toLocaleString()} - {courseName}</p>
                     </li>
                 </Fragment>
            }      

            return <li key={i} className={currentSubjectStyle}>
                <p>{startTime.toLocaleString()} to {endTime.toLocaleString()} - {courseName}</p>
            </li>
        });
        return finalAgenda;
};