import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the rental hero heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/premium car/i);
  expect(headings.length).toBeGreaterThan(0);
});
