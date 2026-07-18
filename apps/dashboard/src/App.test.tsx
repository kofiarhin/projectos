import { render, screen } from '@testing-library/react';

import App from './App';

describe('App shell', () => {
  it('renders the ProjectOS heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'ProjectOS' })).toBeInTheDocument();
  });
});
