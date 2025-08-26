import { FC, FunctionComponent, use } from 'react';
import ical from 'ical';

interface AgendaProps {
    date: string; // Expected format: YYYY-MM-DD
}

interface CalendarEvent {
    summary: string;
    start: Date;
    end: Date;
    description?: string;
}

// async function fetchAndParseICS() {
//     try {
//         // Replace this URL with your actual calendar ICS feed URL
//         const response = await fetch('https://valleyview.edinaschools.org/calendar/calendar_368.ics');
//         const icsData = await response.text();
//         const events = ical.parseICS(icsData);
//         return events;
//     } catch (error) {
//         console.error('Error fetching calendar data:', error);
//         return {};
//     }
// }

function filterEventsByDate(events: any, targetDate: string): CalendarEvent[] {
    const dateToCheck = new Date(targetDate);
    const filteredEvents: CalendarEvent[] = [];

    for (const event of Object.values(events)) {
        const evt = event as any;
        if (evt.type !== 'VEVENT') continue;

        const eventDate = new Date(evt.start);
        if (
            eventDate.getFullYear() === dateToCheck.getFullYear() &&
            eventDate.getMonth() === dateToCheck.getMonth() &&
            eventDate.getDate() === dateToCheck.getDate()
        ) {
            filteredEvents.push({
                summary: evt.summary,
                start: evt.start,
                end: evt.end,
                description: evt.description
            });
        }
    }

    return filteredEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
}

const Agenda: FunctionComponent<AgendaProps> = ({ date }) => {
    // const events = use(fetchAndParseICS());
    const dailyEvents = filterEventsByDate(events, date);

    return (
        <div className="agenda">
            <h2>Schedule for {date}</h2>
            {dailyEvents.length === 0 ? (
                <p>No events scheduled for this date</p>
            ) : (
                <ul className="event-list">
                    {dailyEvents.map((event, index) => (
                        <li key={index} className="event-item">
                            <div className="event-time">
                                {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                            </div>
                            <div className="event-summary">
                                {event.summary}
                            </div>
                            {event.description && (
                                <div className="event-description">
                                    {event.description}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Agenda;