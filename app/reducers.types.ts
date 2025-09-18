import { Temporal } from "@js-temporal/polyfill";
import { GET } from "./api/forecast/route";

export const dataReducerStateActions = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CURRENTDATE: 'currentDate',
    GETTODAY: 'getToday',
    GETCURRENTTIME: 'currentTime'
} as const;

export interface IDateState {
    dd: string;
    mm: string;
    yyyy: string;
    date: Temporal.PlainDateTime;
}

export interface ICurrentTimeState {
    hour: number;
    minute: number;
    second: number;
    time: Temporal.PlainTime;
}
export interface IDateAction {
    type: typeof dataReducerStateActions[keyof typeof dataReducerStateActions];
}

export interface IDateReducer {
    state: IDateState;
    action?: IDateAction;
};
