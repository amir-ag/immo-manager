import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { stylingConstants } from '../../theme/shared-styles';
import { PropertyForm } from './property-form';
import { RentalUnitsOverview } from '../rental-unit/overview/rental-units-overview';
import { useParams } from 'react-router';
import { emptyProperty } from './model/property.model';

export const PropertyDetail = ({ isNew }: { isNew?: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const [currentProperty, setCurrentProperty] = useState({ ...emptyProperty });

    return (
        <>
            <Typography variant={'h5'}>{!isNew ? id : 'Create new Property'}</Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <PropertyForm currentProperty={currentProperty} setCurrentProperty={setCurrentProperty} />
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
