import { getToday, getNextDay, getPrevDay, getDatesObj } from "./utils/Scheduler";
import { IDateState, IDateAction } from "./reducers.types";

export const initialState = getDatesObj(getToday);
export const dateReducer = (state:IDateState, action:IDateAction):IDateState => {    
    switch (action.type) {
        case 'increment':
            return getDatesObj(getNextDay(state.date));
        case 'decrement':
            return getDatesObj(getPrevDay(state.date));
        case 'getToday':
            return initialState;
        case 'currentDate':
            return getDatesObj(state.date);
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
