import { Suspense } from "react";
import { getDatesObj, toWeekDayName, getToday } from "./utils/Scheduler";
import { Forecast } from "./components/Forecast/Forecast";
import { BackpackItems } from "./components/BackpackItems/BackpackItems";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";
import { CardLoading } from "./components/Card/CardLoading";
import Agenda from "./components/Agenda/Agenda";
import { fetchMenu, fetchCalendar } from "./actions/actions";
import { DateHero } from "./components/DateHero/DateHero";

export default async function Home() {
  const { dd, mm, yyyy } = getDatesObj(getToday);
  
  const [menu, calendar] = await Promise.all([
    fetchMenu(yyyy, mm, dd),
    fetchCalendar('https://valleyview.edinaschools.org/cf_calendar/feed.cfm?type=ical&feedID=480A95723BF64AF6A939E3131C04210A'),
  ]);

  return (
    <main className="grid grid-rows-[auto_1fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DateHero />
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
