"use client"
import { FunctionComponent } from 'react';
import { Card, TDay } from '../Card/Card';
import { useDates } from '@/providers';
import { CalendarComponent } from 'ical';
import { fromDateToTemporal } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';
import { CardLoading } from '../Card/CardLoading';
import { Subjects } from './Subject';

interface IAgenda {
    calendar: CalendarComponent[] | void
}

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

const Agenda: FunctionComponent<IAgenda> = ({ calendar }) => {
    if(!calendar) {
        return <CardLoading />;
    }
    const { state: { date } } = useDates();

    const onlyABDays = calendar.filter(day => {   
        if(!day.summary && !isADay(dayType) && !isBDay(dayType)) return null; 
        return day;
    });
    const dayFromCalendar = findDay(onlyABDays, date);
    const dayType = dayFromCalendar?.summary as TDay;

    return (
        <Card title='Agenda' dayType={dayType}>
            
            {dayFromCalendar?.description && 
                <p>{dayFromCalendar?.description}</p>
            }
            <ul>
                <Subjects dayType={dayType}/>
            </ul>
        </Card>
    );
};

export default Agenda;