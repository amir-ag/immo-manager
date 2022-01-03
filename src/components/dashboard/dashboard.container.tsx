import React, { useEffect } from 'react';
import PropertiesOverview from '../property/overview/properties-overview';
import { makeStyles, Typography } from '@material-ui/core';
import { getProperties } from '../../store/slices/properties.slice';
import { getRentalUnits } from '../../store/slices/rental-units.slice';
import { getPersons } from '../../store/slices/persons.slice';
import { getTenancies } from '../../store/slices/tenancies.slice';
import { useAppDispatch } from '../../hooks/store.hooks';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
    },
}));

export const DashboardContainer = () => {
    const cssClasses = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProperties());
        dispatch(getRentalUnits());
        dispatch(getTenancies());
        dispatch(getPersons());
    }, []);

    return (
        <>
            <Typography variant={'h5'} className={cssClasses.title}>
                Dashboard
            </Typography>
            <PropertiesOverview showHeader={false} />
        </>
    );
};
