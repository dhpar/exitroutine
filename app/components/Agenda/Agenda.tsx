"use client"
import { FunctionComponent, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { useDates } from '@/providers';
import { CalendarComponent } from 'ical';
import { CardLoading } from '../Card/CardLoading';
import { fromDateToTemporal } from '@/utils/Scheduler';
import { Temporal } from '@js-temporal/polyfill';
import { useQuery } from '@tanstack/react-query';


// Schoology calendar - webcal://edinaschools.schoology.com/calendar/feed/ical/1755549812/389bf972b855085a3aed23dbb4d3947f/ical.ics

// School A/B days calendar - https://valleyview.edinaschools.org/calendar/calendar_368.ics

// Daily schedule - https://edinaschools.infinitecampus.org/campus/resources/portal/roster?_expand=%7BsectionPlacements-%7Bterm%7D%7D&_date=${yyyy}-${mm}-${dd}&personID=21927
interface IAgenda {
    calendar: CalendarComponent[];
}
// fetch("https://edinaschools.infinitecampus.org/campus/resources/portal/roster?_expand=%7BsectionPlacements-%7Bterm%7D%7D&_date=2025-08-28&personID=21927", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-US,en;q=0.9,ca-ES;q=0.8,ca;q=0.7,es-ES;q=0.6,es;q=0.5",
//     "cache-control": "no-cache",
//     "expires": "0",
//     "priority": "u=1, i",
//     "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://edinaschools.infinitecampus.org/campus/apps/portal/parent/calendar",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });

const findDay = (calendar: CalendarComponent[], day: Temporal.PlainDateTime) =>  
    calendar.find(({start}) => {
        if(!start) return null;
        const currentCalendarDay = Temporal.PlainDate.from(fromDateToTemporal(start).toString());
        const currentSelectedDay = Temporal.PlainDate.from(day.toString());

        return currentCalendarDay.equals(currentSelectedDay);
    });

const Agenda: FunctionComponent<IAgenda> = ({ calendar }) => {
    const [ dayFromCalendar, setDayFromCalendar ] = useState<CalendarComponent | null>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const { state: { yyyy, mm, dd, date } } = useDates();
    const query = useQuery({
        queryKey: ['schoologyCalendar'],
        queryFn: async () => {
            const response = await fetch(`https://edinaschools.infinitecampus.org/campus/resources/portal/roster?_expand=%7BsectionPlacements-%7Bterm%7D%7D&_date=${yyyy}-${mm}-${dd}&personID=21927`, {
                method: 'GET',
                referrer: "https://edinaschools.infinitecampus.org/campus/apps/portal/parent/calendar",
                mode: "cors",
                credentials: "include",
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9,ca-ES;q=0.8,ca;q=0.7,es-ES;q=0.6,es;q=0.5",
                    "cache-control": "no-cache",
                    "Access-Control-Allow-Credentials": "false",
                    "Access-Control-Allow-Origin": "*" ,
                    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT,HEAD",
                    "Access-Control-Allow-Headers": "*" ,    
                    "expires": "0",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    useEffect(() => {
        if(!calendar) return;
        const calendarDay = findDay(calendar, date);
        setDayFromCalendar(calendarDay);
        // It requires authentication (cookies) which are set on the client-side, so it can't be fetched server-side.
        // fetchSchoologyCalendar(yyyy, mm, dd).then(setSchoology);
        
        setIsLoading(false);
    }, [date]);

    if(isLoading) return <CardLoading />
    
    return (
        <Card title='Agenda'>
            <h2>{dayFromCalendar? dayFromCalendar?.summary : "Couldn't find a calendar, outside of school year?"}</h2>
            <p>{dayFromCalendar? dayFromCalendar?.description : ""}</p>
            <p className='text-wrap flex-wrap overflow-[anywhere]'>{JSON.stringify(query)}</p>
        </Card>
    );
};

export default Agenda;