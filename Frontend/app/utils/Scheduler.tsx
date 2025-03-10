import { Temporal } from '@js-temporal/polyfill';

const getToday = ():Temporal.PlainDateTime => Temporal.Now.plainDateTimeISO();
const getDate = () => {
    const { day, month, year, hour, minute, dayOfWeek } = getToday();
    
    return {
        day, 
        month, 
        year, 
        dayOfWeek,
        hour, // 24h format
        minute
    };
};


const getNextMonday = (date: Temporal.PlainDate) => date.add({days: 7 % date.dayOfWeek});
const getNextDay = (date: Temporal.PlainDate) => date.add({days: 1});
const getPrevDay = (date: Temporal.PlainDate) => date.subtract({days: 1});
const isWeekend = (day: number) => day === 6 || day === 7;

export { getToday, getDate, getNextMonday, getNextDay, getPrevDay, isWeekend };