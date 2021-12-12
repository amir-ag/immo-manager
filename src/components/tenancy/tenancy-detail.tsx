import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getDisplayNameOfTenancy, TenancyModel } from './model/tenancy.model';
import { stylingConstants } from '../../theme/shared-styles';
import { TenancyForm } from './tenancy-form';

export const TenancyDetail = ({ tenancy }: { tenancy?: TenancyModel }) => {
    return (
        <>
            <Typography variant={'h5'}>
                {tenancy ? getDisplayNameOfTenancy(tenancy) : 'Create new tenancy'}
            </Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <TenancyForm />
            </Grid>
        </>
    );
};
