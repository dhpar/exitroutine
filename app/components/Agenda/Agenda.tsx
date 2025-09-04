"use client"
import { FunctionComponent, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { useDates } from '@/providers';
import { CalendarComponent } from 'ical';
import { fromDateToTemporal } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';
import aday from './aday.json';
import bday from './bday.json';
import { TDaySchema, TSectionPlacements } from './day';

interface IAgenda {
    calendar: CalendarComponent[];
}


const findDay = (calendar: CalendarComponent[], day: Temporal.PlainDateTime) =>  {
    const currentSelectedDay = Temporal.PlainDate.from(day.toString());
    return calendar.find(({start}) => {
        if(!start) return null;
        const currentCalendarDay = Temporal.PlainDate.from(fromDateToTemporal(start).toString());
        return currentCalendarDay.equals(currentSelectedDay);
    });
}

const isInTerm = (section:TSectionPlacements) => {
    const { state: { date } } = useDates();
    const isCurrentDateAfterStartDate = 
        Temporal.PlainDate.compare(date, section.startDate) >= 0;
    const isCurrentDateBeforeEndDate = 
        Temporal.PlainDate.compare(date, section.endDate) <= 0;
    const isInTerm = isCurrentDateAfterStartDate && isCurrentDateBeforeEndDate;

    return isInTerm;
} 

const Agenda: FunctionComponent<IAgenda> = ({ calendar }) => {
    const [ dayFromCalendar, setDayFromCalendar ] = useState<CalendarComponent | null>();
    const { state: { date } } = useDates();
    
    const subjects = (dayType:Array<TDaySchema>) => dayType.map(({sectionPlacements}) => {
        const filterOffTerms = sectionPlacements.filter(isInTerm);
        return filterOffTerms.map((section, i) => {
            return <li key={i}>
                {section.term.startDate} - {section.term.endDate}: {section.courseName}
            </li>}
        )
    });

    useEffect(() => {
        if(!calendar) return;
        setDayFromCalendar(findDay(calendar, date));
    }, [date]);

    return (
        <Card title='Agenda'>
            <h2>{dayFromCalendar? dayFromCalendar?.summary : "Couldn't find a calendar, outside of school year?"}</h2>
            { dayFromCalendar? <p>{dayFromCalendar.description}</p>: "" }
            <ul>
                {dayFromCalendar?.summary === 'A Day'? subjects(aday): subjects(bday) }
            </ul>
        </Card>
    );
};

export default Agenda;