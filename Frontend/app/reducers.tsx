import { Temporal } from "@js-temporal/polyfill";
import { getNextSchoolDay, getToday, getNextDay, getPrevDay } from "./utils/Scheduler";

export const dataReducerStateActions = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CURRENTDATE: 'currentDate'
} as const;

export interface IDateState {
    date: Temporal.PlainDateTime;
}

export interface IDateAction {
    type: typeof dataReducerStateActions[keyof typeof dataReducerStateActions];
}

export interface IDateReducer {
    state: IDateState;
    action?: IDateAction;
};

export const initialState:IDateState = { 
    date: getNextSchoolDay(getToday)
};

export const dateReducer = (state:IDateState, action:IDateAction):IDateState => {
    switch (action.type) {
        case 'increment':
            return { date: getNextDay(state.date) };
        case 'decrement':
            return { date: getPrevDay(state.date) };
        case 'currentDate':
            return { date: getNextSchoolDay(getToday) };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};
  
