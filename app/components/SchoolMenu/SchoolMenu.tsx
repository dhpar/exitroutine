"use client"
import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { CardError } from "../Card/CardError";
import { CardLoading } from "../Card/CardLoading";
import { useDates } from "@/providers";
import { fetchMenuItems } from "@/api/menu/getSchoolMenu";
import { IItem, IMenuResponse } from "@/api/menu/getSchoolMenu.types";
import { sortByCategory } from "@/utils/utils";
import { pad } from "@/utils/pad";

interface IMenu { 
    menu: IMenuResponse
}

const filterAndPrepareToRender = (response:IMenuResponse, date:string) => {
    const currentDay = response.days.find((day) => day.date === date);
    // logResponse(currentDay?.menu_info);
    // logResponse(currentDay?.menu_items);
    if(!currentDay) throw new Error("No menu found for this day!");

    const resp = currentDay.menu_items
        .filter(item => {
            // Filter by category, food that B is not interested in.
            const foodCategoriesToExclude = ['condiment', 'beverage'];
            if(item.food && !foodCategoriesToExclude.includes(item.category)) {
                // logResponse(item)
                return {
                    food: item.food.name, 
                    category: item.food.food_category 
                }
            }
        })
        .sort(sortByCategory);
    return resp;
}

export const SchoolMenu:FunctionComponent<IMenu> = ({menu}) => {
    // const [ menu, setMenu ] = useState<void | IItem[]>([]);
    // const [ isLoading, setIsLoading ] = useState(true);
    const { state: { date, dd,mm, yyyy} } = useDates();
    
    // useEffect(() => {
    //     fetchMenuItems(yyyy, mm, dd)
    //         .then(setMenu)
    //         .finally(() => setIsLoading(false))
    // }, [date]);
    
    // if(isLoading) return <CardLoading />
    // if((!menu && !isLoading) || typeof menu === 'undefined') return <CardError message="No menu found" statusCode={0} name={"Error Loading Menu"} />
    // if(menu.length === 0) return <Card title='Lunch Menu'>No menu found.</Card>
    const dateHyphenFormat = `${yyyy}-${pad(mm)}-${pad(dd)}`;
    
    return (
        <Card title='Lunch Menu'>
            <ul>{filterAndPrepareToRender(menu, dateHyphenFormat).map((item:IItem, index:number) => (
                <li className="text-cyan-500 text-base" key={`${item.food.name}-${index}`}>
                    {item.food.name} - {item.food.food_category}
                </li>
            ))}</ul>
        </Card>
    );
}
