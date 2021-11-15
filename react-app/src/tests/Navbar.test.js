import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

it('renders navbar title based on prop', () => {
  render(<NavBar navTitle = "Test Title" />);
  expect(screen.getByText(/test title/i)).toBeInTheDocument();
});