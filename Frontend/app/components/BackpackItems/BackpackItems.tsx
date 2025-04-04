import { useWhatItems } from '@/hooks/useWhatItems';
import * as React from 'react';
import { Card } from '../Card/Card';
import { useTime } from '@/hooks/useTime';

export const BackpackItems: React.FunctionComponent<{}> = () => {
    const { today } = useTime();
    const nextWeekday = today === 'Saturday' || today === 'Sunday'? 
        'Monday' : 
        today;
    const items = useWhatItems(nextWeekday);

    if(!items) { 
        return null; 
    }

    return <Card title="Items for school">
        <ul>
            {items.map((item, index) => 
                <li 
                    className="text-cyan-500 text-base" 
                    key={`${item}-${index}`}
                >       
                    {item}
                </li>
            )}
        </ul>
    </Card>;
};
