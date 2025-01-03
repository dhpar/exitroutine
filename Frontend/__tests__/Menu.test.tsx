import Providers from '@/providers';
import Home from '../app/page';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
 
describe('Page', () => {
  it('renders a heading', async () => {
    render(<Providers><Home /></Providers>);
    const heading = await screen.getByTestId('page-heading-level-1');
    expect(heading).toBeInTheDocument();
  })
});