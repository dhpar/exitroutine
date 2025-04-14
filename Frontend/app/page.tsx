"use client"
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { toWeekDayName } from "./utils/Scheduler";
import { Forecast } from "./components/Forecast/Forecast";
import { BackpackItems } from "./components/BackpackItems/BackpackItems";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";
import { CardLoading } from "./components/Card/CardLoadng";
import { useDates } from "./providers";

export default function Home() {
  const {state, dispatch} = useDates();
  
  const decreaseDate = () => dispatch({type: 'decrement'});
  const increaseDate = () => dispatch({type: 'increment'});
  
  // if(!state) {
  //   console.log(state);
  //   return <>
  //     <h1>Error!</h1>
  //     <p>There was an error retrieving the date info (check the console).</p>
  //   </>
  // }

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl" data-testid="page-heading-level-1">
        <button onChange={decreaseDate}>↓</button>Next school day is <span className="text-8xl text-cyan-500">{ state.date.dayOfWeek }</span>
        <button onChange={increaseDate}>↑</button>
      </h1>
      <ul className="grid gap-4 grid-cols-3">
        <li>
        <Suspense fallback={<CardLoading />}>
          <Forecast day = { state.date.toString() } />
        </Suspense>
        </li>
        <li>
          <BackpackItems />
        </li>
        <li>
          <HydrationBoundary state={dehydrate(new QueryClient)}>
            <SchoolMenu 
              dd = {state.date.day.toString()} 
              mm = {state.date.month.toString()} 
              yyyy = {state.date.year.toString()}
            />
          </HydrationBoundary>
        </li>
      </ul> 
    </main>
  );
}
