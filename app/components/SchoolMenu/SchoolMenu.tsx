"use client"
import { FunctionComponent } from "react";
import { Card } from "../Card/Card";
import { useDates } from "@/providers";
import { IItem, IMenuResponse } from "@/api/menu/getSchoolMenu.types";
import { sortByCategory } from "@/utils/utils";
import { pad } from "@/utils/pad";

interface IMenu { 
    menu: IMenuResponse
}

interface GroupedItems {
    [category: string]: IItem[];
}

const filterAndPrepareToRender = (response: IMenuResponse, date: string): GroupedItems | Error => {
    const currentDay = response.days.find((day) => day.date === date);
    
    if (!currentDay) return new Error("No menu found for this day!");
    
    // Filter out items with null food, sort and group into categories.
    return currentDay.menu_items
        .filter(item => item.food !== null)
        .sort(sortByCategory)
        .reduce((acc, item) => {
            const category = item.food.food_category;

            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as GroupedItems);
}

export const SchoolMenu:FunctionComponent<IMenu> = ({menu}) => {
    const { state: { dd,mm, yyyy} } = useDates();
    const dateHyphenFormat = `${yyyy}-${pad(mm)}-${pad(dd)}`;
    const result = Object.entries(filterAndPrepareToRender(menu, dateHyphenFormat));

    if (result instanceof Error) {
        return (
            <Card title='Lunch Menu'>
                <p className="text-gray-100">Error: {result.message}</p>
            </Card>
        );
    }
    
    if (result.length === 0) {
        return (
            <Card title='Lunch Menu'>
                <p className="text-gray-100">
                    No menu items available for this day.
                </p>
            </Card>
        );
    }

    return (
        <Card title='Lunch Menu'>
            <ul>
                {result.map(([category, items]) => (
                    <li className="text-cyan-500 text-base mb-2" key={category}>
                        <details>
                            <summary className="font-semibold cursor-pointer capitalize">
                                {category} ({items.length} items)
                            </summary>
                            <ul className="ml-4 mt-2">
                                {items.map((item:IItem, index:number) => (
                                    <li 
                                        key={`${item.food.name}-${index}`}
                                        className="text-gray-100 text-sm py-1 capitalize"
                                    >
                                        <a href={item.food.image_url}>{item.food.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
