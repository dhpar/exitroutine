import { useTime } from "./hooks/useTime";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Forecast } from "./components/Forecast/Forecast";
import { BackpackItems } from "./components/BackpackItems/BackpackItems";
import { SchoolMenu } from "./components/SchoolMenu/SchoolMenu";

export default function Home() {
  const { today } = useTime();
  const showDay = today === 'Saturday' || today === 'Sunday'? 'Monday' : today;

  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl" data-testid="page-heading-level-1">
        Next school day is <span className="text-8xl text-cyan-500">{ showDay }</span>
      </h1>
      <ul className="grid gap-4 grid-cols-3">
        <li><Forecast /></li>
        <li><BackpackItems /></li>
        <li>
          <HydrationBoundary state={dehydrate(new QueryClient)}>
            <SchoolMenu />
          </HydrationBoundary>
        </li>
      </ul> 
    </main>
  );
}
