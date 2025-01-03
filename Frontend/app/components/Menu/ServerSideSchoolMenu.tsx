"use client";
import { useQuery } from "@tanstack/react-query";
import { useTime } from "../../hooks/useTime";
import { json } from "stream/consumers";
import { fetchMenu } from "@/actions/getSchoolMenu";
import { error } from "console";
// import { useEffect } from "react";   

// const fetchMenu = async (date: string) => {

export default function Menu() {
    const { todayURLFormat } = useTime();
    
    // const data = fetchMenu();
    // const response = useQuery({
    //     queryKey: [ "days" ],
    //     queryFn: fetchMenu
    // });

    if(response.isLoading) return <h2>Loading...</h2>;
    if(response.error && !response.data) return <h2>Error: {response.error.message}</h2>;
    if(!response.data) return <h2>No data</h2>;
    // const menu = response.data.filter((day:any)=> day.date === '2025-01-08');
    // const menuOfDay = menu[0].menu_items.filter((item:any) => item?.food).map((item:any) => item.food.name).join(', ');
    // console.log(menuOfDay);
    
    return (
        <h2>Today's menu is: {JSON.stringify(response)}</h2>
    );
}
