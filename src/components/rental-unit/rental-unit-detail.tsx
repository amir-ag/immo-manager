import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getDisplayNameOfRentalUnit, RentalUnitModel } from './model/rental-unit.model';
import { stylingConstants } from '../../theme/shared-styles';
import { RentalUnitForm } from './rental-unit-form';
import { TenanciesOverview } from '../tenancy/overview/tenancies-overview';

export const RentalUnitDetail = ({ rentalUnit }: { rentalUnit?: RentalUnitModel }) => {
    return (
        <>
            <Typography variant={'h5'}>
                {rentalUnit ? getDisplayNameOfRentalUnit(rentalUnit) : 'Create new rental unit'}
            </Typography>
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
                    <RentalUnitForm />
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
                    <TenanciesOverview />
                </Grid>
            </Grid>
        </>
    );
};
