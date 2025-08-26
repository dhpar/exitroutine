import { Temporal } from "@js-temporal/polyfill";

export const dataReducerStateActions = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CURRENTDATE: 'currentDate',
    GETTODAY: 'getToday',
} as const;

export interface IDateState {
    date: Temporal.PlainDateTime;
    dd: string;
    mm: string;
    yyyy: string;
}

export interface IDateAction {
    type: typeof dataReducerStateActions[keyof typeof dataReducerStateActions];
}

export interface IDateReducer {
    state: IDateState;
    action?: IDateAction;
};
