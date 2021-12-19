import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { stylingConstants } from '../../theme/shared-styles';
import { PropertyForm } from './property-form';
import { RentalUnitsOverview } from '../rental-unit/overview/rental-units-overview';
import { useParams } from 'react-router';
import { emptyProperty, getDisplayNameOfProperty } from './model/property.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectProperties } from '../../store/selectors';
import { propertiesSlice } from '../../store/slices/properties.slice';

export const PropertyDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const propertyToEdit = useAppSelector(selectProperties).find((p) => p.id === id);

    const [currentProperty, setCurrentProperty] = useState(
        !isNew && propertyToEdit ? { ...propertyToEdit } : { ...emptyProperty }
    );

    useEffect(() => {
        if (!isNew) {
            dispatch(propertiesSlice.actions.setCurrentProperty(currentProperty));
        }
    }, [currentProperty]);

    return (
        <>
            <Typography variant={'h5'}>
                {propertyToEdit
                    ? getDisplayNameOfProperty(propertyToEdit)
                    : `Create new Property${!isNew ? ' (Property to edit has not been found!)' : ''}`}
            </Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <PropertyForm
                    currentProperty={currentProperty}
                    setCurrentProperty={setCurrentProperty}
                    isNew={isNew}
                />
                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <RentalUnitsOverview disableCreate={isNew || !propertyToEdit} />
                </Grid>
            </Grid>
        </>
    );
};
