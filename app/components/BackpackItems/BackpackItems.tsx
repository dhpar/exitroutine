"use client"
import { useWhatItems } from '@/hooks/useWhatItems';
import * as React from 'react';
import { Card } from '../Card/Card';
// import { useTime } from '@/hooks/useTime';
import { useDates } from '@/providers';
import { toWeekDayName } from '@/utils/Scheduler';

export const BackpackItems: React.FunctionComponent<{}> = () => {
    const { state: { date } } = useDates();
    const items = useWhatItems(toWeekDayName(date));
    
    if(!items) { 
        return null; 
    }

    return <Card title="Items for school">
        <ul>
            {items.map((item, index) => 
                <li className="text-cyan-500 text-base" key={`${item}-${index}`}>       
                    {item}
                </li>
            )}
        </ul>
    </Card>;
};
