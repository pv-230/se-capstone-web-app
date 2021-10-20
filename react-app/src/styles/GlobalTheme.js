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
        typography: {
            h2: {
              lineHeight: 1.2,
            },
        },
    },
    textField: {
        textColor: "#fff",
        borderColor: "#fff"
    },
});