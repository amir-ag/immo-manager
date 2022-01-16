import { createTheme } from '@material-ui/core/styles';
import '@fontsource/quicksand';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
            light: '#8ac4c1',
        },
        background: {
            default: '#F9F9F9',
            paper: '#fff',
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
