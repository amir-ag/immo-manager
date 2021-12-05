import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getDisplayNameOfProperty, PropertyModel } from './model/property.model';
import { stylingConstants } from '../../theme/shared-styles';
import { PropertyForm } from './property-form';
import { RentalUnitsOverview } from '../rental-unit/overview/rental-units-overview';

export const PropertyDetail = ({ propertyProps }: { propertyProps: PropertyModel }) => {
    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfProperty(propertyProps)}</Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <PropertyForm />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <RentalUnitsOverview />
                </Grid>
            </Grid>
        </>
    );
};
