import React from 'react';
import PropertiesView from '../properties/properties-view';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    },
}));

export const DashboardContainer = () => {
    const cssClasses = useStyles();

    return (
        <>
            <Typography variant={'h5'} className={cssClasses.title}>
                Dashboard
            </Typography>
            <PropertiesView showHeader={false} />;
        </>
    );
};
