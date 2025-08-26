// import { logHeaders } from "./logger";

export const sortByCategory = (a:any, b:any) => a.category.localeCompare(b.category);
export const pad = (num:string) => Number(num) < 10?  num.padStart(2, '0') : num;
export const responseToJson = (response:Response) => {
    // logHeaders(response);

    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }

    return response.json();
}