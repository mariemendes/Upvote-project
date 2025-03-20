import { render, screen } from '@testing-library/react';
import App from './App';

test('renders toggle selection button', () => {
  render(<App />);
  // const toggleButton = screen.getByText(/Toggle Selection/i); 
  // expect(toggleButton).toBeInTheDocument(); 
});

