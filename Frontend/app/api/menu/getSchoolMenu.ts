"use server"
import { logHeaders, logResponse } from "@/utils/logger";
import { IMenuResponse } from "./getSchoolMenu.types";
import { pad } from "@/utils/pad";
import { sortByCategory, responseToJson } from "@/utils/utils";

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

export const fetchMenuItems = async (yyyy: string, mm: string, dd: string) => {
    const dateHyphenFormat = `${yyyy}-${pad(mm)}-${pad(dd)}`;
    const school = 'valley-view';
    
    return await fetch(`https://edinaschools.api.nutrislice.com/menu/api/weeks/school/${school}/menu-type/lunch/${yyyy}/${mm}/${dd}/`)
        .then(responseToJson)
        .then(response => filterAndPrepareToRender(response, dateHyphenFormat))
        .catch(console.error);
}