import React from 'react';
import { ReactComponent as ImmoLogo } from '../../assets/svg/logo.svg';
import {
    AppBar,
    Avatar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/user.slice';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/route-constants';
import { getAuth } from 'firebase/auth';
import MenuIcon from '@material-ui/icons/Menu';
import { selectUser } from '../../store/selectors';

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const auth = getAuth();
    const user = auth.currentUser;

    const isMdUp = useMediaQuery(theme.breakpoints.up('lg'));

    // TODO figure out how to handle KeyboardEvent | MouseEvent
    const toggleDrawer = (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(!open);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        history.push('profile');
        setAnchorEl(null);
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
                    <div onClick={handleClick} aria-controls="user-menu" aria-haspopup="true">
                        {user?.photoURL ? (
                            <Avatar className={classes.avatar} src={user.photoURL} />
                        ) : (
                            <Avatar className={classes.avatar} />
                        )}
                    </div>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={isMdUp ? 'permanent' : 'temporary'}
                anchor={'left'}
                open={open}
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
