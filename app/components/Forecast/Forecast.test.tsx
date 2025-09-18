import { Forecast } from './Forecast';
import { act, render } from "@testing-library/react";

describe('Renders the component Forecast', () => {
    test('...with a unordered list', async () => {
        const { getByTestId  } = await act(() => render(<Forecast />))
        
        const element = getByTestId('forecast');
        expect(element).toBeInTheDocument();
    });
});