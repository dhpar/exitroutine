import { IItem } from "@/api/menu/getSchoolMenu.types";

export const sortByCategory = (a:IItem, b:IItem) => a.category.localeCompare(b.category);
export const pad = (num:string) => Number(num) < 10?  num.padStart(2, '0') : num;
export const responseToJson = (response:Response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.json();
}