import { GridSpacing, makeStyles } from '@material-ui/core';

export const stylingConstants: { gridSpacing: GridSpacing } = {
    gridSpacing: 4,
};

export const useSharedStyles = makeStyles((theme) => ({
    nested6ColGridItemLeft: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.spacing(2)}px)`,
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginBottom: theme.spacing(4),
        },
    },
    nested6ColGridItemRight: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${theme.spacing(2)}px)`,
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}));
