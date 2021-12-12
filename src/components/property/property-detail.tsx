import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { PropertyModel } from './model/property.model';
import { stylingConstants } from '../../theme/shared-styles';
import { PropertyForm } from './property-form';
import { RentalUnitsOverview } from '../rental-unit/overview/rental-units-overview';
import { useParams } from 'react-router';

export const PropertyDetail = ({ property, isNew }: { property?: PropertyModel; isNew?: boolean }) => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Typography variant={'h5'}>{!isNew ? id : 'Create new Property'}</Typography>
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
