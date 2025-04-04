import { Card } from './Card';
import { act, render } from "@testing-library/react";

describe('In the component "Card"', () => {
    test('we can have children', () => {
        const { getByText } = render(
            <Card title={'title'}>
                <p id='test'>text</p>
            </Card>
        )
        const mockedChild = getByText('text');
        expect(mockedChild).toBeInTheDocument();
    });
    
    test('and has a heading of level 2', () => {
        const { getByRole } = render(
            <Card title={'test'}>
                <p id='test'>test</p>
            </Card>
        )
        const heading = getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
    });
});