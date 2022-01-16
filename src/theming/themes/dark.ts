import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#26292C',
            light: '#515B5F',
            dark: '#1A2327',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFB74D',
            light: '#FFC670',
            dark: '#C89259',
            contrastText: '#000000DE',
        },
        background: {
            default: '#39311D',
            paper: '#515B5F',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 950,
            lg: 1200,
            xl: 1400,
        },
    },
});

export default theme;
