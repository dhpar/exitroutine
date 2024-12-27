import { useQuery, UseQueryResult } from "react-query";
import { useTime } from "./useTime";

type JSONPrimitive = string | number | boolean | null;

type JSONStructure = {
  [key in string]: JSONPrimitive | JSONStructure | (JSONStructure | JSONPrimitive)[];
} | JSONStructure[];

const fetchMenu = async (day:string) => {
    const res = await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/normandale/menu-type/lunch/2025/01/05`);
    // const res = await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/normandale/menu-type/lunch/${day}`);

    return res.json();
};

export const useTodayMenu = async () => {
    const { todayURLFormat } = useTime();

    const getMenu = await fetchMenu(todayURLFormat);
    return useQuery("users", getMenu);
}