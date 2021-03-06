import React, { useEffect } from 'react';
import PropertiesOverview from '../property/overview/properties-overview';
import { getProperties } from '../../store/slices/properties.slice';
import { getRentalUnits } from '../../store/slices/rental-units.slice';
import { getPersons } from '../../store/slices/persons.slice';
import { getTenancies } from '../../store/slices/tenancies.slice';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { IntroHeader } from '../ui/intro-header/intro-header';

export const Dashboard = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProperties());
        dispatch(getRentalUnits());
        dispatch(getTenancies());
        dispatch(getPersons());
    }, [dispatch]);

    return (
        <>
            <IntroHeader title="Dashboard" subtitle="All important things at a glance." />
            <PropertiesOverview showSearchHeader={false} />
        </>
    );
};
