import React from 'react';
import {LayoutProps} from "./types";
import {Drawer, makeStyles, Typography} from "@material-ui/core";

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
    }
})

const Layout = ({children}: LayoutProps) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant={"permanent"}
                anchor={"left"}
                classes={{ paper: classes.drawPaper }}
            >
                <Typography variant={"h5"}>
                    Immo Manager v1
                </Typography>
            </Drawer>
            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
