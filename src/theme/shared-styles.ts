import { GridSpacing, makeStyles } from '@material-ui/core';

export const gridSpacingBig: GridSpacing = 4;
export const gridSpacingSmall: GridSpacing = 3;
export const drawerWidth = 280;

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
