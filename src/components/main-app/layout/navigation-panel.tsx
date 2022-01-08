import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { ReactComponent as ImmoLogo } from '../../../assets/svg/logo.svg';
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { logout } from '../../../store/slices/user.slice';
import { drawerWidth } from '../../../theme/shared-styles';
import { mainMenuEntries } from '../main-menu-entries';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { ToggleNavPanelProps } from '../model/toggle-nav-panel.props';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    appLogo: {
        padding: theme.spacing(2),
        width: drawerWidth - 2 * theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '50px',
    },
    navList: {
        flexGrow: 1,
    },
    navListItem: {
        '&.active': {
            background: '#8c8c8c',
        },
        '&:hover': {
            background: '#c4c4c4',
        },
        padding: theme.spacing(2),
    },
    logoutButton: {
        margin: theme.spacing(10, 1),
        padding: theme.spacing(2),
    },
}));

type NavigationPanelProps = ToggleNavPanelProps & {
    isNavPanelOpen: boolean;
};

const NavigationPanel = ({ handleToggleNavPanel, isNavPanelOpen }: NavigationPanelProps) => {
    const cssClasses = useStyles();
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const dispatch = useAppDispatch();

    return (
        <Drawer
            className={cssClasses.drawer}
            variant={isLgUp ? 'permanent' : 'temporary'}
            anchor={'left'}
            open={isNavPanelOpen}
            onClose={handleToggleNavPanel}
            classes={{ paper: cssClasses.drawerPaper }}
        >
            <NavLink to={routes.DASHBOARD}>
                <ImmoLogo className={cssClasses.appLogo} />
            </NavLink>
            <List className={cssClasses.navList}>
                {mainMenuEntries.map((item) => (
                    <ListItem
                        key={item.text}
                        button
                        component={NavLink}
                        to={item.path}
                        className={cssClasses.navListItem}
                        onClick={handleToggleNavPanel}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Button
                className={cssClasses.logoutButton}
                variant={'outlined'}
                color={'secondary'}
                onClick={() => dispatch(logout())}
            >
                Logout
            </Button>
        </Drawer>
    );
};

export default NavigationPanel;
