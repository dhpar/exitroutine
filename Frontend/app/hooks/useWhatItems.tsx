import { Monda } from "next/font/google";

export const useWhatItems = (dayOfWeek:string) => {
    const items:Record<string, Array<string>> = {
        Monday: [
            'Books for the library', 
            'Clothes for art class',
            'Orchestra folder',
            'Homework (required)',
        ],
        Tuesday: [
            'Shoes for gym class',
        ],
        Wednesday: [],
        Thursday: [
            'Shoes for gym class',
        ],
        Friday: [
            'Homework (optional)',  
        ],
    };
    return items[dayOfWeek];
};