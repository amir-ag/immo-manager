import React from 'react';
import { makeStyles } from '@material-ui/core';
import MainHeader from './main-header';
import NavigationPanel from './navigation-panel';

export type LayoutProps = {
    children: React.ReactNode;
};

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
        },
        pageContainer: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
            paddingTop: 0,
        },
        headerSpacer: theme.mixins.toolbar,
    };
});

const Layout = ({ children }: LayoutProps) => {
    const classes = useStyles();
    const [isNavPanelOpen, setIsNavPanelOpen] = React.useState(false);

    // TODO figure out how to handle KeyboardEvent | MouseEvent
    const handleToggleNavPanel = (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsNavPanelOpen(!isNavPanelOpen);
    };

    return (
        <div className={classes.root}>
            <MainHeader handleToggleNavPanel={handleToggleNavPanel} />
            <NavigationPanel handleToggleNavPanel={handleToggleNavPanel} isNavPanelOpen={isNavPanelOpen} />

            {/* Page Content */}
            <div className={classes.pageContainer}>
                <div className={classes.headerSpacer} />
                {children}
            </div>
        </div>
    );
};

export default Layout;
