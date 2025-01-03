const url = new URL("https://edinaschools.api.nutrislice.com/menu/api/weeks/school/normandale/menu-type/lunch/2025/01/10/");
const method = "GET";
const headers = new Headers(
    {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://edinaschools.api.nutrislice.com",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
    }
);

export const fetchMenuItems = async (yyyy: string, mm: string, dd: string) => {
    const date = `${yyyy}/${mm}/${dd}`;
    const dateSlashFormat = `${yyyy}-${mm}-${dd}`;
    return await fetch(url, { method, headers })
        .then( resp =>  resp.json())
        .then( data => {
            const menu = data.days.filter((day:any)=> day.date === dateSlashFormat);
            return menu[0].menu_items.filter((item:any) => item?.food).map((item:any) => item.food.name); 
        });
}