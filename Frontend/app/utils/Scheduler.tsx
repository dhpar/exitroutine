import { Temporal } from '@js-temporal/polyfill';

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

const toWeekDayName = (day: number, shortFormat = false) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return shortFormat? shortWeekDays[day] : weekDays[day];
}

const getNextDay = (date: Temporal.PlainDateTime):Temporal.PlainDateTime => date.add({days: 1});
const getPrevDay = (date: Temporal.PlainDateTime):Temporal.PlainDateTime => date.subtract({days: 1});

// Provide a day, and if is still this function should return next school day
const getNextSchoolDay = (date: Temporal.PlainDateTime) => {

   
    const isAfterMorningBus = date.hour > 8;
    const isWeekEnd = 
        (date.dayOfWeek === 4 && isAfterMorningBus) || 
        date.dayOfWeek === 5 || 
        date.dayOfWeek === 6;

    if(isWeekEnd) {
        return date.add({days: date.daysInWeek - date.dayOfWeek});
    } 

    return isAfterMorningBus? date.add({days: 1}) : date;
}

export { getToday, getTime, getDate, getNextSchoolDay, getNextDay, getPrevDay, toWeekDayName };