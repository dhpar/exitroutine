import { TSectionPlacements } from '@/components/Agenda/day';
import { IScheduleItem } from '@/components/Agenda/Subject';
import { TDay } from '@/components/Card/Card';
import { ICurrentTimeState, IDateState } from '@/reducers.types';
import { Temporal, Intl } from '@js-temporal/polyfill';

const getToday = Temporal.Now.plainDateTimeISO();

const getCurrentTime = ():ICurrentTimeState => {
    return {
        hour: Temporal.Now.plainTimeISO().hour,
        minute:  Temporal.Now.plainTimeISO().minute,
        second:  Temporal.Now.plainTimeISO().second,
        time:  Temporal.Now.plainTimeISO()
    }
};

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

const getDatesObj = (date: Temporal.PlainDateTime):IDateState => ({
    date: getNextSchoolDay(date),
    dd:  getNextSchoolDay(date).toLocaleString("en-US", { day: '2-digit' }),
    mm: getNextSchoolDay(date).toLocaleString("en-US", { month: '2-digit' }),
    yyyy: getNextSchoolDay(date).toLocaleString("en-US", { year: 'numeric' })
});

/**
 * sortInstantStrings will sort an array of strings (each of which is
 * parseable as a Temporal.Instant and may or may not include an IANA time
 * zone name) by the corresponding exact time (e.g., for presenting global
 * log events sequentially).
 *
 * @param {string[]} strings - an array of ISO strings
 * @param {boolean} [reverse=false] - ascending or descending order
 * @returns {string[]} the array from strings, sorted
 */
const sortInstantStrings = (a: IScheduleItem, b: IScheduleItem): number => {
    if (!a.startTime || !b.startTime) return 0;
    const timeA = Temporal.PlainTime.from(a.startTime);
    const timeB = Temporal.PlainTime.from(b.startTime);
    
    return Temporal.PlainTime.compare(timeA, timeB);
}

const isString = (time: unknown): time is string => typeof time === 'string'; 

const isPlainTime = (time: unknown): time is Temporal.PlainTime => time instanceof Temporal.PlainTime;

const isPlainDateTime = (time: unknown): time is Temporal.PlainDateTime => time instanceof Temporal.PlainDateTime;


function isInTimeWindow<T extends string | Temporal.PlainDateTime | Temporal.PlainDateTimeLike | Temporal.PlainTime> (one: T, windowOne: T, windowtwo: T): boolean {
    let isAfterStartDate = false;
    let isBeforeEndDate = false;
    if((isPlainDateTime(one) && isPlainDateTime(windowOne) && isPlainDateTime(windowtwo))) {
        isAfterStartDate = Temporal.PlainDateTime.compare(one, windowOne) >= 0;
        isBeforeEndDate = Temporal.PlainDateTime.compare(one, windowtwo) <= 0;
    } else {
        const timeOne = Temporal.PlainTime.from(one);
        const timeWindowOne = Temporal.PlainTime.from(windowOne);
        const timeWindowTwo = Temporal.PlainTime.from(windowtwo);
                isAfterStartDate = Temporal.PlainTime.compare(timeOne, timeWindowOne) >= 0;
        isBeforeEndDate = Temporal.PlainTime.compare(timeOne, timeWindowTwo) <= 0;
    }
   
    return isAfterStartDate && isBeforeEndDate;
}

const isTodayASection = (section:TSectionPlacements, dayType: TDay) => { 
    return dayType?.toLowerCase() === section.periodScheduleName.toLowerCase();
}
export { 
    getToday, 
    getCurrentTime, 
    getDate, 
    getNextSchoolDay, 
    getNextDay, 
    getPrevDay, 
    toWeekDayName, 
    getDatesObj, 
    fromDateToTemporal,
    sortInstantStrings,
    isString,
    isPlainTime,
    isPlainDateTime,
    isInTimeWindow,
    isTodayASection
};
