import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders a logo', () => {
    render(<Header />);
    const logo = screen.getByText(/To-deeds/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders a navbar', () => {
    render(<Header />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeTruthy();
  });
});
