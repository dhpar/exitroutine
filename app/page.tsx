import { Suspense } from "react";
import { toWeekDayName } from "./utils/Scheduler";
import { Forecast } from "./components/Forecast/Forecast";
import { BackpackItems } from "./components/BackpackItems/BackpackItems";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";
import { CardLoading } from "./components/Card/CardLoading";
import { useDates } from "./providers";
import ChevronLeft from './assets/icons/chevron-left.svg';
import ChevronRight from './assets/icons/chevron-right.svg';
import { initialState } from "./reducers";
import Agenda from "./components/Agenda/Agenda";
import { fetchMenu, fetchCalendar } from "./actions/actions";

export default async function Home() {
  const { state: {dd, mm, yyyy, date}, dispatch } = useDates();
  const decreaseDate = () => dispatch({type: 'decrement'});
  const increaseDate = () => dispatch({type: 'increment'});
  const getToday = () => dispatch({type: 'getToday'});
  const isCurrentDateToday = date.toPlainDate().toString() === initialState.date.toPlainDate().toString();
  
  const [menu, calendar] = await Promise.all([
    fetchMenu(yyyy, mm, dd),
    fetchCalendar('https://valleyview.edinaschools.org/cf_calendar/feed.cfm?type=ical&feedID=480A95723BF64AF6A939E3131C04210A'),
  ]);

  return (
    <main className="grid grid-rows-[auto_1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full justify-between items-stretch">
        <button onClick={decreaseDate} className={`py-2 px-4 mr-4   text-slate-50 rounded-lg ${!isCurrentDateToday && "border-slate-50 border-solid border-2 hover:bg-slate-50 hover:text-slate-900"}`} disabled={isCurrentDateToday}>
          <ChevronLeft />
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
          <ChevronRight />
        </button>
      </div>
      <ul className="grid gap-4 w-full">
        <li className="col-span-2">
        <Suspense fallback={<CardLoading />}>
          <Forecast />
        </Suspense>
        </li>
        <li className="col-span-1">
          <Suspense fallback={<CardLoading />}>
            <Agenda calendar={calendar}/>
          </Suspense>
        </li>
        <li className="col-span-1">
          <Suspense fallback={<CardLoading />}>
              <SchoolMenu menu={menu}/>
          </Suspense>
        </li>
        <li className="col-span-1">
          <BackpackItems />
        </li>
      </ul> 
    </main>
  );
}
