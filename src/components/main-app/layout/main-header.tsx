import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    ClickAwayListener,
    Grow,
    IconButton,
    makeStyles,
    MenuList,
    Paper,
    Popper,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { format } from 'date-fns';
import * as constants from '../../../constants';
import MenuItem from '@material-ui/core/MenuItem';
import routes from '../../../routes/route-constants';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../../../store/slices/user.slice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { drawerWidth } from '../../../theme/shared-styles';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { selectUser } from '../../../store/selectors';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { ToggleNavPanelProps } from '../model/toggle-nav-panel.props';

const useStyles = makeStyles((theme) => ({
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        background: '#FFFFFF',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    navigationButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    notificationArea: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    userName: {
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 'auto',
        },
    },
    avatar: {
        marginLeft: theme.spacing(2),
    },
    avatarMenuIcon: {
        marginRight: theme.spacing(1),
    },
}));

type MainHeaderProps = ToggleNavPanelProps & {};

const MainHeader = ({ handleToggleNavPanel }: MainHeaderProps) => {
    const cssClasses = useStyles();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    const { firstName, lastName } = useAppSelector(selectUser);

    // TODO: Use user in store instead!
    const auth = getAuth();
    const user = auth.currentUser;

    const avatarRef = React.useRef<HTMLDivElement>(null);

    const handleProfileMenuToggle = () => {
        setOpenProfileMenu((prevState) => !prevState);
    };

    const handleProfileMenuClose = (event: React.MouseEvent<EventTarget>) => {
        if (avatarRef.current && avatarRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpenProfileMenu(false);
    };

    const handleProfileMenuEntryKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenProfileMenu(false);
        }
    };

    return (
        <AppBar className={cssClasses.appbar} elevation={0}>
            <Toolbar>
                <IconButton
                    color={'secondary'}
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleToggleNavPanel}
                    className={cssClasses.navigationButton}
                    data-testid={'burger-menu'}
                >
                    <MenuIcon />
                </IconButton>
                <Typography color={'secondary'} variant={'h5'} className={cssClasses.notificationArea}>
                    Today is the {format(new Date(), constants.dateFormatLong)}
                </Typography>
                <Typography color={'secondary'} variant={'h6'} className={cssClasses.userName}>
                    {firstName && firstName}
                </Typography>
                <div
                    onClick={handleProfileMenuToggle}
                    data-testid={'avatar'}
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    ref={avatarRef}
                >
                    {user?.photoURL ? (
                        <Avatar className={cssClasses.avatar} src={user.photoURL} />
                    ) : (
                        <Avatar className={cssClasses.avatar}>
                            {firstName?.charAt(0)?.toUpperCase() + lastName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                    )}
                </div>
                <Popper
                    open={openProfileMenu}
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
                                <ClickAwayListener onClickAway={handleProfileMenuClose}>
                                    <MenuList id="user-menu" onKeyDown={handleProfileMenuEntryKeyDown}>
                                        <MenuItem onClick={() => history.push(routes.PROFILE)}>
                                            <AccountCircleIcon className={cssClasses.avatarMenuIcon} />
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={() => dispatch(logout())}>
                                            <ExitToAppIcon className={cssClasses.avatarMenuIcon} />
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
    );
};

export default MainHeader;
