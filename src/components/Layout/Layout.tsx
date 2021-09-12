import React from 'react';
import {LayoutProps} from "./types";
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography} from "@material-ui/core";
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import {useHistory, useLocation} from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%',
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
    }
})

const Layout = ({children}: LayoutProps) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Create Property',
            icon: <HomeWorkOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/property'
        },
        {
            text: 'Create Person',
            icon: <PersonAddOutlinedIcon color={"secondary"}/>,
            path: '/dashboard/people'
        },
    ];

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant={"permanent"}
                anchor={"left"}
                classes={{paper: classes.drawPaper}}
            >
                <Typography variant={"h5"}>
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
                {children}
            </div>
        </div>
    );
};

export default Layout;
