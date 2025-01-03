import Menu from "./components/Menu/ServerSideSchoolMenu";
import { useTime } from "./hooks/useTime";
import { useWeatherFetch } from "./hooks/useWeatherFetch";
import { useWhatItems } from "./hooks/useWhatItems";
import { Card } from "./components/Card";
import { fetchMenuItems } from "./actions/getSchoolMenu";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function Home() {
  const { today } = useTime();
  const items = useWhatItems(today);
  // const maxAparentTemp = daily.apparentTemperatureMax[0].toFixed(2);
  // const minAparentTemp = daily.apparentTemperatureMin[0].toFixed(2);
  const queryClient = new QueryClient();
  // const precipitation = hourly.precipitation[0].toFixed(2);

  const data = await fetchMenuItems('2025', '01', '08');
  
  const maxAparentTemp = 0;
  const minAparentTemp = 0;
  const precipitation = 0;
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl" data-testid="page-heading-level-1">Today is <span className="text-8xl text-cyan-500">{ today }</span></h1>
      <ul className="grid gap-4 grid-cols-3">
        <li>
          <Card title="Apparent max. temp" value={maxAparentTemp} unit='F' />
        </li>
        <li>
          <Card title="Apparent min. temp" value={minAparentTemp} unit='F' />
        </li>
        <li>
          <Card title="Precipitation" value={precipitation} unit='Inches' />
        </li>
        <li>
          {today !== 'Saturday' && today !== 'Sunday' && items && <Card title="Items to bring" cardText={`Don't forget to bring ${items.join(', ')}`} />}
        </li>
        
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Card title='Launch Menu'>
            {data.map((item:string) => <li>{item}</li>)}
          </Card>
        </HydrationBoundary>
      </ul> 
    </main>
  );
}
