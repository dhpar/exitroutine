"use server"

import ical from 'ical';

export const fetchCalendar = async (url:string) => {
    try {
        // Replace this URL with your actual calendar ICS feed URL
        const response = await fetch('https://valleyview.edinaschools.org/calendar/calendar_368.ics');
        const icsData = await response.text();
        const events = ical.parseICS(icsData);
        return events;
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        return {};
    }
    
    // return await fetch(`https://valleyview.edinaschools.org/calendar/calendar_368.ics`, {
    //     "credentials": "include",
    //     "headers": {
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0",
    //         "Accept": "*/*",
    //         "Accept-Language": "en-US,en;q=0.5",
    //         "X-Requested-With": "XMLHttpRequest",
    //         "Sec-GPC": "1",
    //         "Sec-Fetch-Dest": "empty",
    //         "Sec-Fetch-Mode": "cors",
    //         "Sec-Fetch-Site": "same-origin"
    //     },
    //     "referrer": "https://valleyview.edinaschools.org/calendar/calendar_368.ics",
    //     "method": "GET",
    //     "mode": "cors"
    // });
}