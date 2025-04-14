import { QueryClient, useQuery } from "@tanstack/react-query";
import { useTime } from "../../hooks/useTime";
import { fetchMenuItems } from "@/actions/getSchoolMenu";
import { FunctionComponent, use, useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { CardError } from "../Card/CardError";
import { CardLoading } from "../Card/CardLoadng";

interface ISchoolMenu {
    yyyy: string;
    mm: string;
    dd: string;
}

export const SchoolMenu:FunctionComponent<ISchoolMenu> = ({yyyy, mm, dd}) => {
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchMenuItems(yyyy, mm, dd).then(resp => {
            setMenu(resp);
        }).finally(() => setIsLoading(false));
    }, []);
    
    if(isLoading) return <CardLoading />
    if(!menu && !isLoading) return <CardError message="No menu found" />

    return (
        <Card title='Lunch Menu'>
            <ul>{menu.map((item:{food:string, category:string}, index:number) => (
                <li className="text-cyan-500 text-base" key={`${item}-${index}`}>
                    {item.food}
                </li>
            ))}</ul>
        </Card>
    );
}
