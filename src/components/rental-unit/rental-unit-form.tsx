import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { rentalUnitfloorLevel, RentalUnitModel, rentalUnitType } from './model/rental-unit.model';
import { stylingConstants, useSharedStyles } from '../../theme/shared-styles';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';
import { getDisplayNameOfProperty } from '../property/model/property.model';
import { dummyProperties } from '../property/dummy-properties';
import routes from '../../routes/route-constants';
import { useAppDispatch } from '../../store/hooks';
import { useHistory } from 'react-router';
import { createOrUpdateRentalUnit } from '../../store/slices/rental-units.slice';

export type RentalUnitFormProps = {
    currentRentalUnit: RentalUnitModel;
    setCurrentRentalUnit: Dispatch<SetStateAction<RentalUnitModel>>;
    propertyId: string;
    isNew: boolean;
};

export const RentalUnitForm = ({
    currentRentalUnit,
    setCurrentRentalUnit,
    propertyId,
    isNew,
}: RentalUnitFormProps) => {
    const sharedCssClasses = useSharedStyles();

    const dispatch = useAppDispatch();
    const history = useHistory();

    // TODO: Reuse
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentRentalUnit((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(createOrUpdateRentalUnit(currentRentalUnit));
        if (isNew) {
            history.push(routes.getPropertyDetailRouteById(propertyId));
        }
    };

    const handleCancel = () => {
        history.push(routes.getPropertyDetailRouteById(propertyId));
    };

    return (
        <Grid
            item
            container
            xs={12}
            sm={6}
            spacing={stylingConstants.gridSpacing}
            alignItems={'center'}
            alignContent={'flex-start'}
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
        >
            <Grid item xs={12}>
                <Typography variant={'h6'}>General Info</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'property'}
                    label={'Property'}
                    type="text"
                    // TODO: Get data via firestore
                    defaultValue={getDisplayNameOfProperty(dummyProperties[0])}
                    required
                    disabled
                />
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
            <DetailViewFormActions handleCancel={() => {}} />
        </Grid>
    );
};
