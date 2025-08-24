"use server"
import ical from 'ical';

export const getCalendar = async (url:string) => {
    const fetchCalendar = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/calendar',
        },
    });
    const calendarText = await fetchCalendar.text();
    const parsedCalendar = Object.values(ical.parseICS(calendarText));
    
    return parsedCalendar.filter(value => 
        value.type == 'VEVENT' && value
    );
}