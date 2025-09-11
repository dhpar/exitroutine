import { Suspense } from "react";
import { getDatesObj, getToday } from "./utils/Scheduler";
import { Forecast } from "./components/Forecast/Forecast";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";
import { CardLoading } from "./components/Card/CardLoading";
import Agenda from "./components/Agenda/Agenda";
import { fetchMenu, fetchCalendar } from "./actions/actions";
import { DateHero } from "./components/DateHero/DateHero";

export default async function Home() {
  const { dd, mm, yyyy } = getDatesObj(getToday);
  
  const [menu, schoolCalendar] = await Promise.all([
    fetchMenu(yyyy, mm, dd),
    fetchCalendar()
  ]);
  
  return (
    <main className="grid grid-rows-[auto_1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <ul className="grid gap-4 min-w-0 grid-cols-2 max-w-full">
        <li className="col-span-2">
          <DateHero />
        </li>
        <li className="col-span-2">
        <Suspense fallback={<CardLoading />}>
          <Forecast />
        </Suspense>
        </li>
        <li className="col-span-1">
          <Suspense fallback={<CardLoading />}>
            <Agenda calendar={schoolCalendar}/>
          </Suspense>
        </li>
        <li className="col-span-1">
          <Suspense fallback={<CardLoading />}>
              <SchoolMenu menu={menu}/>
          </Suspense>
        </li>
      </ul> 
    </main>
  );
}
