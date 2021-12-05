import React from 'react';
import { Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { rentalUnitfloorLevel, rentalUnitType } from './model/rental-unit.model';
import { useSharedStyles } from '../../theme/shared-styles';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';

export const RentalUnitForm = () => {
    const sharedCssClasses = useSharedStyles();

    return (
        <>
            <Grid item xs={12}>
                <Typography variant={'h6'}>General Info</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={12} md={6}>
                    <TextField
                        className={sharedCssClasses.nested6ColGridItemLeft}
                        variant={'outlined'}
                        id={'ewid'}
                        label={'EWID'}
                        type="number"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        className={sharedCssClasses.nested6ColGridItemRight}
                        id={'type'}
                        select
                        label="Select"
                        helperText="Select a room type"
                        variant="outlined"
                    >
                        {rentalUnitType.map((rut, i) => (
                            <MenuItem value={i}>{rut}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'numberOfRooms'}
                    label={'Number of Rooms'}
                    type="number"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'surfaceInM2'}
                    label={'Surface in m2'}
                    type="number"
                />
            </Grid>
            <Grid item xs={12}>
                {/* TODO: Check if it's possible to use an 'Autocomplete' component */}
                <TextField
                    id={'floorLevel'}
                    select
                    label="Select"
                    helperText="Select a floor level"
                    variant="outlined"
                    fullWidth
                >
                    {rentalUnitfloorLevel.map((rufl, i) => (
                        <MenuItem value={i}>{rufl}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <DetailViewFormActions />
        </>
    );
};
