import { createTheme } from '@mui/material/styles';

export const globalDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#792330',
    },
    secondary: {
      main: '#ddc48c',
    },
  },
  typography: {
    h2: {
      lineHeight: 1.2,
    },
  },
});

export const globalLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ddc48c',
    },
    secondary: {
      main: '#792330',
    },
    typography: {
      h2: {
        lineHeight: 1.2,
      },
    },
  },
});