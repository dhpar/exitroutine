"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Menu from "./components/Menu";
import { useTime } from "./hooks/useTime";
import { useWeatherFetch } from "./hooks/useWeatherFetch";
import { useWhatItems } from "./hooks/useWhatItems";

const queryClient = new QueryClient();

export default async function Home() {
  const { today } = useTime();
  // const today = 'Monday';

  const { daily, hourly } = await useWeatherFetch();
  const items = useWhatItems(today);
  const maxAparentTemp = daily.apparentTemperatureMax[0].toFixed(2);
  const minAparentTemp = daily.apparentTemperatureMin[0].toFixed(2);
  const precipitation = hourly.precipitation[0].toFixed(2);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">Today is { today }</h1>
          <dl className="w-full">
            <div className="flex flex-shrink flex-grow-0 w-full flex-nowrap items-baseline">
              <dt className="w-1/2">Apparent max. temp</dt>
              <dd className="w-1/2 text-right text-3xl">{maxAparentTemp} F</dd>
            </div>
            <div className="flex flex-shrink flex-grow-0 w-full flex-nowrap items-baseline">
              <dt className="w-1/2">Apparent min. temp</dt>
              <dd className="w-1/2 text-right text-3xl">{minAparentTemp} F</dd>
            </div>
            <div className="flex flex-shrink flex-grow-0 w-full flex-nowrap items-baseline">
              <dt className="w-1/2">Precipitation</dt>
              <dd className="w-1/2 text-right text-3xl">{precipitation} I</dd>
            </div>
          </dl> 
          {today !== 'Saturday' && today !== 'Sunday' && items? <p>Don't forget to bring {items.join(', ')}</p> : ''}
          <Menu />
        </main>
      </div>
    </QueryClientProvider>
  );
}
