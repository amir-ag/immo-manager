import { makeStyles } from '@material-ui/core';
import normal from './themes/normal';
import dark from './themes/dark';
import { Theme } from '@material-ui/core/styles';

type ThemeType = 'normal' | 'dark';

const themes = {
    normal,
    dark,
};

export default function getTheme(theme: ThemeType): Theme {
    return themes[theme];
}

export const useSharedStyles = makeStyles((theme) => ({
    nested6ColGridItemLeft: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.spacing(2)}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: theme.spacing(4),
        },
    },
    nested6ColGridItemRight: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.spacing(2)}px)`,
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
}));
