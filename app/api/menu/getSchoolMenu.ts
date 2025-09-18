"use server"
import { IMenuResponse } from "./getSchoolMenu.types";
import { sortByCategory } from "@/utils/utils";

const pad = (num:string) => Number(num) < 10?  num.padStart(2, '0') : num;
const responseToJson = (response:Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.json();
}

const filterAndPrepareToRender = (response:IMenuResponse, date:string) => {
    const currentDay = response.days.find((day) => day.date === date);
    if(!currentDay) throw new Error("No menu found for this day!");

    const resp = currentDay.menu_items
        .filter(item => {
            // Filter by category, food that B is not interested in.
            const foodCategoriesToExclude = ['condiment', 'beverage'];
            if(item.food && !foodCategoriesToExclude.includes(item.category)) {
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