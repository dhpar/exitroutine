import { Temporal } from "@js-temporal/polyfill";
import { getToday, getNextDay, getPrevDay, getDatesObj } from "./utils/Scheduler";

export const dataReducerStateActions = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    CURRENTDATE: 'currentDate'
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

export const initialState:IDateState = getDatesObj(getToday);
export const dateReducer = (state:IDateState, action:IDateAction):IDateState => {
    switch (action.type) {
        case 'increment':
            return getDatesObj(getNextDay(state.date));
        case 'decrement':
            return getDatesObj(getPrevDay(state.date));
        case 'currentDate':
            return initialState;
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
