import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getDisplayNameOfTenancy, TenancyModel } from './model/tenancy.model';
import { stylingConstants } from '../../theme/shared-styles';
import { TenancyForm } from './tenancy-form';

export const TenancyDetail = ({ tenancyProps }: { tenancyProps: TenancyModel }) => {
    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfTenancy(tenancyProps)}</Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <TenancyForm />
            </Grid>
        </>
    );
};
