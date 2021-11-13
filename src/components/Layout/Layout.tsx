import React from 'react';
import { ReactComponent as ImmoLogo } from '../../assets/svg/logo.svg';
import {
    AppBar,
    Avatar,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/user.slice';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';

export type LayoutProps = {
    children: React.ReactNode;
    menuItems: MenuItems[];
};

type MenuItems = {
    text: string;
    icon: JSX.Element;
    path: string;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        drawer: {
            width: drawerWidth,
        },
        drawPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex',
        },
        listItem: {
            '&.active': {
                background: '#8c8c8c',
            },
            '&:hover': {
                background: '#c4c4c4',
            },
            padding: theme.spacing(2),
        },
        // TODO: Do proper svg positioning and styling and not this hack
        logo: {
            padding: theme.spacing(2),
            width: drawerWidth - 2 * theme.spacing(2),
            marginBottom: theme.spacing(2),
            height: '50px',
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            background: '#FFFFFF',
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
        list: {
            flexGrow: 1,
        },
        logout: {
            margin: theme.spacing(10, 1),
            padding: theme.spacing(2),
        },
    };
});

const Layout = ({ children, menuItems }: LayoutProps) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { displayName } = useAppSelector(selectUser);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography color={'secondary'} variant={'h5'} className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography color={'secondary'} variant={'h6'}>
                        {displayName && displayName}
                    </Typography>
                    <Avatar className={classes.avatar}>A</Avatar>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={'permanent'}
                anchor={'left'}
                classes={{ paper: classes.drawPaper }}
            >
                <NavLink to={routes.DASHBOARD}>
                    <ImmoLogo className={classes.logo} />
                </NavLink>
                <List className={classes.list}>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            button
                            component={NavLink}
                            to={item.path}
                            className={classes.listItem}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    className={classes.logout}
                    variant={'outlined'}
                    color={'secondary'}
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </Button>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar} />
                {children}
            </div>
        </div>
    );
};

export default Layout;
