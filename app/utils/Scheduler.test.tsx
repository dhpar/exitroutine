
import { Temporal } from '@js-temporal/polyfill';
import { getNextDay } from './Scheduler';

describe('When calling nextday function', () => {
    test.each([
        [7, 2],
        [8, 3],
        [9, 4],
        [10, 5],
        [11, 6],
        [12, 7],
        [13, 1]
    ])('given %i as argument, should return %i', (calendarDay, expectedDay) => {
        const dayPlainDate = new Temporal.PlainDate(2025, 4, calendarDay); 
        const actualDay = getNextDay(dayPlainDate).dayOfWeek;
        expect(actualDay).toBe(expectedDay);
    });
});