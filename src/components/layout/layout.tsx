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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/user.slice';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';
import { getAuth } from 'firebase/auth';
import MenuIcon from '@material-ui/icons/Menu';

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
        appbarMobile: {
            width: '100%',
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
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
    };
});

const Layout = ({ children, menuItems }: LayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { firstName } = useAppSelector(selectUser);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const isMdUp = useMediaQuery(theme.breakpoints.up('lg'));

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
            <AppBar className={isMdUp ? classes.appbar : classes.appbarMobile} elevation={0}>
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
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography color={'secondary'} variant={'h6'}>
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
                            <Avatar className={classes.avatar} />
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
                                            <MenuItem onClick={() => history.push('profile')}>
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
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
                variant={isMdUp ? 'permanent' : 'temporary'}
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
