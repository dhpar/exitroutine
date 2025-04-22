import { getToday, getNextDay, getPrevDay, getDatesObj } from "./utils/Scheduler";
import { IDateState, IDateAction } from "./reducers.types";

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
