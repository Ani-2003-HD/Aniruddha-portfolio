import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio name in hero section', () => {
  render(<App />);
  const nameElement = screen.getByRole('heading', { level: 1, name: /Aniruddha HD/i });
  expect(nameElement).toBeInTheDocument();
});
