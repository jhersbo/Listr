import { render, screen } from '@testing-library/react';
import App from './App';

test('renders !user page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign in to manage your lists./i);
  expect(linkElement).toBeInTheDocument();
});
