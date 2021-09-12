import React from 'react';
import {LayoutProps} from "./types";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    page: {
        background: '#f9f9f9',
        width: '100%'
    }
})

const Layout = ({children}: LayoutProps) => {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
