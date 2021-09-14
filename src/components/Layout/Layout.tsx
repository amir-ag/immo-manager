import React from 'react';
import {LayoutProps} from "./types";
import {
    AppBar,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import {useHistory, useLocation} from "react-router";
import {format} from 'date-fns'

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
        }
    }
})

const Layout = ({children}: LayoutProps) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Properties',
            icon: <HomeWorkOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/'
        },
        {
            text: 'People',
            icon: <PersonAddOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/people'
        },
        {
            text: 'Contracts',
            icon: <NoteOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/contracts'
        },
        {
            text: 'Tenant Overview',
            icon: <GroupOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/tenants'
        },
    ];

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
                        Username
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

                <List>
                    {menuItems.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : undefined}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}/>
                {children}
            </div>
        </div>
    );
};

export default Layout;
