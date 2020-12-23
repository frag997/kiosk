import { render, screen } from '@testing-library/react';
import App from './App';

test('renders frontend page', () => {
  render(<App />);
  const linkElement = screen.getByText(/The current time/i);
  expect(linkElement).toBeInTheDocument();
});
