import React, { useState } from 'react';
import { ReactComponent as ImmoLogo } from '../../assets/svg/logo.svg';
import {
    AppBar,
    Avatar,
    Button,
    ClickAwayListener,
    Drawer,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuList,
    Paper,
    Popper,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { logout } from '../../store/slices/user.slice';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';
import { getAuth } from 'firebase/auth';
import MenuIcon from '@material-ui/icons/Menu';
import { selectUser } from '../../store/selectors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as constants from '../../constants';

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
            paddingTop: 0,
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
            [theme.breakpoints.down('md')]: {
                width: '100%',
            },
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
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
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
        avatarMenuIcon: {
            marginRight: theme.spacing(1),
        },
        firstname: {
            margin: 0,
            [theme.breakpoints.down('xs')]: {
                marginLeft: 'auto',
            },
        },
    };
});

const Layout = ({ children, menuItems }: LayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { firstName, lastName } = useAppSelector(selectUser);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    // TODO figure out how to handle KeyboardEvent | MouseEvent
    const toggleDrawer = (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(!openDrawer);
    };

    const handleMenuToggle = () => {
        setOpenMenu((prevState) => !prevState);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (avatarRef.current && avatarRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpenMenu(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <IconButton
                        color={'secondary'}
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography color={'secondary'} variant={'h5'} className={classes.date}>
                        Today is the {format(new Date(), constants.dateFormatLong)}
                    </Typography>
                    <Typography color={'secondary'} variant={'h6'} className={classes.firstname}>
                        {firstName && firstName}
                    </Typography>
                    <div
                        onClick={handleMenuToggle}
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        ref={avatarRef}
                    >
                        {user?.photoURL ? (
                            <Avatar className={classes.avatar} src={user.photoURL} />
                        ) : (
                            <Avatar className={classes.avatar}>
                                {firstName?.charAt(0)?.toUpperCase() + lastName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                        )}
                    </div>
                    <Popper
                        open={openMenu}
                        anchorEl={avatarRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="user-menu" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={() => history.push(routes.PROFILE)}>
                                                <AccountCircleIcon className={classes.avatarMenuIcon} />
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={() => dispatch(logout())}>
                                                <ExitToAppIcon className={classes.avatarMenuIcon} />
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={isLgUp ? 'permanent' : 'temporary'}
                anchor={'left'}
                open={openDrawer}
                onClose={toggleDrawer}
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
                            onClick={toggleDrawer}
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
