import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '../components/NavBar';

// Navbar tests
describe('navbar tests', () => {
  it('sets navbar title based on prop', () => {
    render(<NavBar navTitle="Test Title" />);
    const navBar = screen.getByRole('banner');
    expect(navBar).toBeInTheDocument();
  });

  it('hides navbar when title prop not set', () => {
    render(<NavBar />);
    const navBar = screen.queryByRole('banner');
    expect(navBar).not.toBeInTheDocument();
  });
});

// Nav menu tests
describe('nav menu tests', () => {
  it('nav menu opens when clicked', () => {
    render(<NavBar navTitle="Test Title" />);
    const navMenuButton = screen.getByTestId('navMenuButton');
    userEvent.click(navMenuButton);
    const navMenu = screen.getByRole('menu');
    expect(navMenu).toBeInTheDocument();
  });
});

// Account menu tests
describe('account menu tests', () => {
  it('account menu opens when clicked', () => {
    render(<NavBar navTitle="Test Title" />);
    const accountMenuButton = screen.getByTestId('accountMenuButton');
    userEvent.click(accountMenuButton);
    const accountMenu = screen.getByRole('menu');
    expect(accountMenu).toBeInTheDocument();
  });
});
