const sortByCategory = (a:any, b:any) => a.food.food_category.localeCompare(b.food.food_category);

export const fetchMenuItems = async (yyyy: string, mm: string, dd: string) => {
    const dateSlashFormat = `${yyyy}-${mm}-${dd}`;
    const url = `https://edinaschools.api.nutrislice.com/menu/api/weeks/school/normandale/menu-type/lunch/${yyyy}/${mm}/${dd}/`;
    const request = new Request(
        url, 
        { 
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": url,
                "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
            } 
        }
    );

    const fetchItems = await fetch(request)
        .then( resp =>  resp.json())
        .then(({days}) => {
            const currentDay = days.find((day:any) => day.date === dateSlashFormat);
            if(!currentDay) return [];

            return currentDay.menu_items
                .filter((item:any) => item?.food)
                .sort(sortByCategory)
                .map((item:any) => ({ 
                    food: item.food.food_name, 
                    category: item.food.food_category 
                }))
        });

    if(!fetchItems) return ['Loading...']
    if(fetchItems.length === 0) return ['No lunch today!']

    return fetchItems;
}