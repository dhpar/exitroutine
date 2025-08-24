"use client"
import { FunctionComponent, useEffect, useState } from 'react';
import { getCalendar } from '@/api/calendar/getCalendar';
import { Card } from '../Card/Card';
import { useDates } from '@/providers';
import { CalendarComponent } from 'ical';
import { CardLoading } from '../Card/CardLoading';
import { fromDateToTemporal } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';


// Schoology calendar - webcal://edinaschools.schoology.com/calendar/feed/ical/1755549812/389bf972b855085a3aed23dbb4d3947f/ical.ics

// School A/B days calendar - https://valleyview.edinaschools.org/calendar/calendar_368.ics
const findDay = (calendar: CalendarComponent[], day: Temporal.PlainDateTime) =>  
    calendar.find(({start}) => {
        if(!start) return null;
        const currentCalendarDay = Temporal.PlainDate.from(fromDateToTemporal(start).toString());
        const currentSelectedDay = Temporal.PlainDate.from(day.toString());
        return currentCalendarDay.equals(currentSelectedDay);
    });

const Agenda: FunctionComponent = ({ }) => {
    const [ calendar, setCalendar ] = useState<CalendarComponent[] | null>();
    const [ dayFromCalendar, setDayFromCalendar ] = useState<CalendarComponent | null>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const { state: { date } } = useDates();

    useEffect(() => {
        if(calendar) return;
        getCalendar('https://valleyview.edinaschools.org/calendar/calendar_368.ics')
            .then(setCalendar)
            .finally(() => setIsLoading(false));
    },[]);

    useEffect(() => {
        if(!calendar) return;
        const calendarDay = findDay(calendar, date);
        setDayFromCalendar(calendarDay);
    }, [date]);

    if(isLoading) return <CardLoading />
    
    return (
        <Card title='Agenda'>
            <h2>{dayFromCalendar? dayFromCalendar?.summary : "Couldn't find a calendar, outside of school year?"}</h2>
            <p>{dayFromCalendar? dayFromCalendar?.description : ""}</p>
        </Card>
    );
};

export default Agenda;