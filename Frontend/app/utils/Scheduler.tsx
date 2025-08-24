import { Temporal, toTemporalInstant, Intl } from '@js-temporal/polyfill';

const getToday = Temporal.Now.plainDateTimeISO();
const getTime = Temporal.Now.plainTimeISO();
const getDate = () => {
    const { day, month, year, hour, minute, dayOfWeek } = getToday;
    
    return {
        day, 
        month, 
        year, 
        dayOfWeek,
        hour, // 24h format
        minute
    };
};

const toWeekDayName = (date: Temporal.PlainDateTime, format: "long" | "short" | "narrow" | undefined = 'long') => date.toLocaleString("en-US", { weekday: format });
const getNextDay = (date: Temporal.PlainDateTime):Temporal.PlainDateTime => getNextSchoolDay(date.add({days: 1}));

const getPrevDay = (date: Temporal.PlainDateTime):Temporal.PlainDateTime => {
    const prevDay = getNextSchoolDay(date.subtract({days: 1}));
    return Temporal.PlainDateTime.compare(prevDay, getToday) === 1? 
        prevDay : getToday;
}

// Provide a day, and if is still this function should return next school day
const getNextSchoolDay = (date: Temporal.PlainDateTime) => {
    // If is Friday after bus pick up should show next Mon
    // Is Fryday after 8, go to Monday (add 3 days).
    // Is Saturday, go to Monday (add 2 days).
    // Is Sunday, go to Monday (add 1 days).
    const weekDay = date.toLocaleString("en-US", { weekday: 'short' });
   
    if (weekDay === 'Sat') return date.add({days: 2});
    if (weekDay === 'Sun') return date.add({days: 1});
    return date;
}

const fromDateToTemporal = (
    date: Date, 
    fractionalSecondDigits: 3 | 2 | 1 | undefined = 3
) => {
    const formatter = new Intl.DateTimeFormat('en', {
        timeZone: 'America/Chicago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: 'numeric',
        fractionalSecondDigits,
        timeZoneName: 'longOffset'
    });

    // Extract each date/time component
    const parts = formatter.formatToParts(date).filter(({ type }) => type !== 'literal');
    const { 
        year, 
        month, 
        day, 
        timeZoneName 
    } = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    const offset = timeZoneName === 'GMT' ? '+00:00' : timeZoneName.replace('GMT', '');

    const dateAndTime = `${year}-${month}-${day}T00:00:00`;

    return Temporal.PlainDateTime.from(`${dateAndTime}${offset}[America/Chicago]`);
}

const getDatesObj = (date: Temporal.PlainDateTime) => ({
    date: getNextSchoolDay(date),
    dd:  getNextSchoolDay(date).toLocaleString("en-US", { day: '2-digit' }),
    mm: getNextSchoolDay(date).toLocaleString("en-US", { month: '2-digit' }),
    yyyy: getNextSchoolDay(date).toLocaleString("en-US", { year: 'numeric' })
});

export { 
    getToday, 
    getTime, 
    getDate, 
    getNextSchoolDay, 
    getNextDay, 
    getPrevDay, 
    toWeekDayName, 
    getDatesObj, 
    fromDateToTemporal 
};
