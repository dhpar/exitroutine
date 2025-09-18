"use client"
import { useDates } from "@/providers";
import { initialState } from "@/reducers";
import { toWeekDayName } from "@/utils/Scheduler";
import { FunctionComponent } from "react";

export const DateHero:FunctionComponent = () => {
    const { state: {date}, dispatch } = useDates();
    const decreaseDate = () => dispatch({type: 'decrement'});
    const increaseDate = () => dispatch({type: 'increment'});
    const getToday = () => dispatch({type: 'getToday'});
    const isCurrentDateToday = date.toPlainDate().toString() === initialState.date.toPlainDate().toString();

    return <div className="flex w-full justify-between items-stretch">
        <button onClick={decreaseDate} className={`py-2 px-4 mr-4   text-slate-50 rounded-lg ${!isCurrentDateToday && "border-slate-50 border-solid border-2 hover:bg-slate-50 hover:text-slate-900"}`} disabled={isCurrentDateToday}>
          {/* <ChevronLeft /> */}
            {'<'}
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl mb-4" data-testid="page-heading-level-1">
              <span className="text-8xl text-cyan-500">
                {toWeekDayName(date)}
              </span>
              <span>({date.toPlainDate().toString()})</span>
          </h1>
      
          <button onClick={getToday} className="py-2 px-4 mr-4 text-slate-50 border-slate-50 border-solid border-2 rounded-lg hover:text-slate-900  hover:bg-slate-50">
              Today
          </button> 
        </div>
        <button onClick={increaseDate} className="py-2 px-4 mr-4 border-slate-50 border-solid border-2  text-slate-50 rounded-lg hover:text-slate-900  hover:bg-slate-50">
          {/* <ChevronRight /> */}
          {'>'}
        </button>
      </div>
}