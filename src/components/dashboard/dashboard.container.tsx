import React from 'react';
import PropertiesOverview from '../property/overview/properties-overview';
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
            <PropertiesOverview showHeader={false} />
        </>
    );
};
