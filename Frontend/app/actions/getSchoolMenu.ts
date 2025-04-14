"use server"
import { logHeaders, logResponse } from "@/utils/logger";
import { IMenuResponse } from "./getSchoolMenu.types";

const sortByCategory = (a:any, b:any) => a.category.localeCompare(b.category);
const pad = (num:string) => Number(num) < 10?  num.padStart(2, '0') : num;
const responseToJson = (response:Response) => {
    logHeaders(response);

    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.json();
}

const filterAndPrepareToRender = (response:IMenuResponse, date:string) => {
    const currentDay = response.days.find((day) => day.date === date);
    logResponse(currentDay?.menu_info);
    logResponse(currentDay?.menu_items);
    if(!currentDay) throw new Error("No menu found for this day!");

    return currentDay.menu_items
        .map((item) => {
            // Filter by category, food that B is not interested in.
            const foodCategoriesToExclude = ['condiment', 'beverage'];
            if(item.food && !foodCategoriesToExclude.includes(item.category)) {
                logResponse(item)
                return {
                    food: item.food.name, 
                    category: item.food.food_category 
                }
            }
        })
        .sort(sortByCategory);
}

export const fetchMenuItems = async (yyyy: string, mm: string, dd: string) => {
    const dateHyphenFormat = `${yyyy}-${pad(mm)}-${pad(dd)}`;
    const school = 'normandale';
    
    return await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/${school}/menu-type/lunch/${yyyy}/${mm}/${dd}/`)
        .then(responseToJson)
        .then(response => filterAndPrepareToRender(response, dateHyphenFormat))
        .catch(console.error);
}