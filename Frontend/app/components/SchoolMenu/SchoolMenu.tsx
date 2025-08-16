import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { CardError } from "../Card/CardError";
import { CardLoading } from "../Card/CardLoading";
import { useDates } from "@/providers";
import { fetchMenuItems } from "@/api/menu/getSchoolMenu";
import { IItem } from "@/api/menu/getSchoolMenu.types";

export const SchoolMenu:FunctionComponent<{}> = () => {
    const [ menu, setMenu ] = useState<void | IItem[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { state: { date, dd,mm, yyyy} } = useDates();
    
    useEffect(() => {
        fetchMenuItems(yyyy, mm, dd)
            .then(setMenu)
            .finally(() => setIsLoading(false))
            .catch(console.assert);
    }, [date]);
    
    if(isLoading) return <CardLoading />
    if((!menu && !isLoading) || typeof menu === 'undefined') return <CardError message="No menu found" statusCode={0} name={"Error Loading Menu"} />
    if(menu.length === 0) return <Card title='Lunch Menu'>No menu found.</Card>
    
    return (
        <Card title='Lunch Menu'>
            <ul>{menu.map((item:IItem, index:number) => (
                <li className="text-cyan-500 text-base" key={`${item.food.name}-${index}`}>
                    {item.food.name}
                </li>
            ))}</ul>
        </Card>
    );
}
