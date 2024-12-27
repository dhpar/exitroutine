import { useTodayMenu } from "../hooks/useMenu";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { useTime } from "../hooks/useTime";

export default function Menu() {
//     const { todayURLFormat } = useTime();
    const queryClient = useQueryClient()
    const menus = useQuery({
        queryKey: ["days"],
        queryFn: async () => {
            const data = await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/normandale/menu-type/lunch/${day}`);
            return data.json();    
        },
    });

    if(menus.isLoading) {
        return <h2>Loading...</h2>
    }
    
    return (
        <h2>Today's menu is: {JSON.stringify(menus)}</h2>
    );
}
