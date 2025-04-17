import { fetchMenuItems } from "@/actions/getSchoolMenu";
import { FunctionComponent, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, use, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { CardError } from "../Card/CardError";
import { CardLoading } from "../Card/CardLoadng";
import { IItem } from "@/actions/getSchoolMenu.types";
import { useDates } from "@/providers";

export const SchoolMenu:FunctionComponent<{}> = () => {
    const [menu, setMenu] = useState<void | IItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { state: { date, dd,mm, yyyy} } = useDates();
    
    useEffect(() => {
        fetchMenuItems(yyyy, mm, dd)
            .then(setMenu)
            .finally(() => setIsLoading(false))
            .catch(console.assert);
    }, [date]);
    
    if(isLoading) return <CardLoading />
    if(!menu && !isLoading) return <CardError message="No menu found" statusCode={0} name={"Error Loading Menu"} />

    return (
        <Card title='Lunch Menu'>
            <ul>{menu?.map((item:IItem, index) => (
                <li className="text-cyan-500 text-base" key={`${item.food.name}-${index}`}>
                    {item.food.name}
                </li>
            ))}</ul>
        </Card>
    );
}
