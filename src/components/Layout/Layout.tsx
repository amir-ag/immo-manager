import React from 'react';
import {LayoutProps} from "./types";
import {
    AppBar,
    Avatar, Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useHistory, useLocation} from "react-router";
import {format} from 'date-fns'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {logout, selectUser} from "../../slices/userSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
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
        active: {
            background: '#f4f4f4',
        },
        listItem: {
            padding: theme.spacing(2)
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            background: '#FFFFFF'
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
        }
    }
})

const Layout = ({children, menuItems}: LayoutProps) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {displayName} = useAppSelector(selectUser);

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography color={"secondary"} variant={"h5"} className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography color={"secondary"} variant={"h6"}>
                        {displayName && displayName}
                    </Typography>
                    <Avatar className={classes.avatar}>A</Avatar>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant={"permanent"}
                anchor={"left"}
                classes={{paper: classes.drawPaper}}
            >
                <Typography variant={"h5"} className={classes.title}>
                    Immo Manager v1
                </Typography>

                <List className={classes.list}>
                    {menuItems.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={`${location.pathname === item.path ? classes.active : undefined} ${classes.listItem}`}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
                <Button
                    className={classes.logout}
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => dispatch(logout())}
                >
                    Logout
                </Button>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}/>
                {children}
            </div>
        </div>
    );
};

export default Layout;
