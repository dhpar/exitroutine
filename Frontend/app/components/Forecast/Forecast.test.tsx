import { getWeather } from '@/page';
import { Forecast } from './Forecast';
import { act, render, screen } from "@testing-library/react";
import { Temporal } from '@js-temporal/polyfill';
import { getToday } from '@/utils/Scheduler';

describe('Renders the component Forecast', () => {
    test('...with a unordered list', async () => {
        const { getByTestId  } = await act(() => render(
            <Forecast weatherResponse={getWeather({lat: 20, lon: 40}, getToday())} />))
        
        const element = getByTestId('forecast');
        expect(element).toBeInTheDocument();
    });
});