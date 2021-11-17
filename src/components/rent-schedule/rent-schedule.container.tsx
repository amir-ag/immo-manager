import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { RentSchedule } from './rent-schedule';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    },
}));

export const RentScheduleContainer = () => {
    const cssClasses = useStyles();

    return (
        <>
            <Typography variant={'h5'} className={cssClasses.title}>
                Rent Schedule
            </Typography>
            <RentSchedule />
        </>
    );
};
