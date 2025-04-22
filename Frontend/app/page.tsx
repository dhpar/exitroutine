"use client"
import { Suspense } from "react";
import { toWeekDayName } from "./utils/Scheduler";
import { Forecast } from "./components/Forecast/Forecast";
import { BackpackItems } from "./components/BackpackItems/BackpackItems";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";
import { CardLoading } from "./components/Card/CardLoading";
import { useDates } from "./providers";

export default function Home() {
  const { state, dispatch } = useDates();
  const decreaseDate = () => dispatch({type: 'decrement'});
  const increaseDate = () => dispatch({type: 'increment'});
  const currentDate = () => dispatch({type: 'currentDate'});

  return (
    <main className="grid grid-rows-[1rem_1rem_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-4xl" data-testid="page-heading-level-1">
          <button onClick={decreaseDate} className="py-2 px-4 mr-4 bg-slate-50 text-slate-900 rounded-lg hover:bg-transparent hover:text-slate-50 hover:border-solid hover:border hover:border-slate-50">
            &lt;
          </button> 
            Next school day is <span className="text-8xl text-cyan-500">{ toWeekDayName(state.date) }</span>
          <button onClick={increaseDate} className="py-2 px-4 mr-4 bg-slate-50 text-slate-900 rounded-lg hover:bg-transparent hover:text-slate-50 hover:border-solid hover:border hover:border-slate-50">
            &gt;
          </button>
        </h1>
        <button onClick={currentDate} className="py-2 px-4 mr-4 bg-slate-50 text-slate-900 rounded-lg hover:bg-transparent hover:text-slate-50 hover:border-solid hover:border hover:border-slate-50">
            ↩
        </button> 
      </div>
      <h2 className="text-xl">{state.date.toPlainDate().toString()}</h2>
      <ul className="grid gap-4 grid-cols-3">
        <li>
        <Suspense fallback={<CardLoading />}>
          <Forecast />
        </Suspense>
        </li>
        <li>
          <BackpackItems />
        </li>
        <li>
          <Suspense fallback={<CardLoading />}>
            {/* <HydrationBoundary state={dehydrate(new QueryClient)}> */}
              <SchoolMenu />
            {/* </HydrationBoundary> */}
          </Suspense>
        </li>
      </ul> 
    </main>
  );
}
