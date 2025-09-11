"use client"
import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { useDates } from '@/providers';
import { CalendarComponent } from 'ical';
import { fromDateToTemporal, sortInstantStrings } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';
import data from './aday.json';
import { TDaySchema, TSectionPlacements } from './day';
import { CardLoading } from '../Card/CardLoading';

interface IAgenda {
    calendar: CalendarComponent[] | void
}

const Day = {
    a: "A Day",
    b:  "B Day"
} as const;

const LAUNCH = {
    startTime: '12:10',
    endTime: '12:40'
}

type TDay = typeof Day[keyof typeof Day];
const isADay = (dayType:string) => dayType.toLowerCase() === 'a day';
const isBDay = (dayType:string) => dayType.toLowerCase() === 'b day';

const findDay = (calendar: CalendarComponent[], day: Temporal.PlainDateTime) =>  {
    const currentSelectedDay = Temporal.PlainDate.from(day.toString());
    return calendar.find(({start, summary}) => {
        if(!start || !summary || (!isADay(summary) && !isBDay(summary))) {        
            return null; 
        }
        const currentCalendarDay = Temporal.PlainDate.from(fromDateToTemporal(start).toString());
        return currentCalendarDay.equals(currentSelectedDay);
    });
}

const isInTerm = (section:TSectionPlacements) => {
    const { state: { date } } = useDates();
    const isAfterStartDate = 
        Temporal.PlainDate.compare(date, section.startDate) >= 0;
    const isBeforeEndDate = 
        Temporal.PlainDate.compare(date, section.endDate) <= 0;
    
    return isAfterStartDate && isBeforeEndDate;
} 

const isTodayASection = (section:TSectionPlacements, dayType: TDay) =>  dayType.toLowerCase() === section.periodScheduleName.toLowerCase();

const Subjects:FunctionComponent<{dayType:TDay}> = ({dayType}) => {
    const launchTimes = {
        startTime: Temporal.PlainTime.from(LAUNCH.startTime),
        endTime: Temporal.PlainTime.from(LAUNCH.endTime)
    }
    return (data as TDaySchema[]).map(day => {
        const sectionsInTerm = day.sectionPlacements.filter(isInTerm);
        const sectionsInDayType = sectionsInTerm.filter(section => isTodayASection(section, dayType));
        return sectionsInDayType;
    })
        .flat()
        .sort(sortInstantStrings)
        .map((section:TSectionPlacements, i:number) => {
            const startTime = section.startTime? 
                [
                    section.startTime?.split(':')[0], 
                    section.startTime?.split(':')[1]
                ].join(':') : '';

            const endTime = section.endTime?
                ` to ${[
                    section.endTime?.split(':')[0], 
                    section.endTime?.split(':')[1]
                ].join(':')}` : '';
            // const isLaunchTimeAfter = section.startTime? (Temporal.PlainTime.compare(
            //     section.startTime, 
            //     launchTimes.startTime
            // ) <= 0) : null;
            // const isLaunchTimeBefore = section.endTime? Temporal.PlainTime.compare(section.endTime, launchTimes.endTime) <= 0 : null;

            // if(isLaunchTimeAfter && isLaunchTimeBefore) {
            //     return <Fragment key={i}>
            //         <li>
            //             <p>{launchTimes.startTime.toString()}{launchTimes.endTime.toString()} - Launch</p>
            //         </li>
            //         <li>
            //             <p>{startTime}{endTime} - {section.courseName}</p>
            //         </li>
            //     </Fragment>
            // }

            if(startTime){
                return <li key={i}>
                    <p>{startTime}{endTime} - {section.courseName}</p>
                </li>
            }
        });
};



const Agenda: FunctionComponent<IAgenda> = ({ calendar }) => {
    if(!calendar) {
        return <CardLoading />;
    }
    const { state: { date } } = useDates();
    const onlyABDays = calendar.filter(day => {   
        if(!day.summary && (!isADay(dayType) && !isBDay(dayType))) return null; 
        return day;
    });
    const dayFromCalendar = findDay(onlyABDays, date);
    const dayType = dayFromCalendar?.summary as TDay;

    return (
        <Card title='Agenda'>
            <h2>{dayType}</h2>
            {dayFromCalendar?.description && <p>{dayFromCalendar?.description}</p>}
            <ul>
                <Subjects dayType={dayType}/>
            </ul>
        </Card>
    );
};

export default Agenda;