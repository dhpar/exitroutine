import { QueryClient, useQuery } from "@tanstack/react-query";
import { useTime } from "../../hooks/useTime";
import { fetchMenuItems } from "@/actions/getSchoolMenu";
import { use } from "react";
import { Card } from "../Card/Card";

export const SchoolMenu = () => {
    const { today } = useTime();
    const data = use(fetchMenuItems('2025', '2', '17'));
    const showDay = today === 'Saturday' || today === 'Sunday'? 'Monday' : today;
    const queryClient = new QueryClient();

    
    return (
        <Card title='Lunch Menu'>
            <ul>
                {data.map(
                    (item:string, index:number) => 
                        <li 
                            className="text-cyan-500 text-base" 
                            key={`${item}-${index}`}
                        >
                            {item}
                        </li>
                )}
            </ul>
        </Card>
    );
}
