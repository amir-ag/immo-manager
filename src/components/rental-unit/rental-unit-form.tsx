import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { rentalUnitfloorLevel, RentalUnitModel, rentalUnitType } from './model/rental-unit.model';
import { stylingConstants, useSharedStyles } from '../../theme/shared-styles';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { getDisplayNameOfProperty, PropertyModel } from '../property/model/property.model';
import routes from '../../routes/route-constants';
import { useAppDispatch } from '../../hooks/store.hooks';
import { useHistory } from 'react-router';
import { createOrUpdateRentalUnit } from '../../store/slices/rental-units.slice';
import { useForms } from '../../hooks/forms.hooks';

export type RentalUnitFormProps = {
    currentRentalUnit: RentalUnitModel;
    setCurrentRentalUnit: Dispatch<SetStateAction<RentalUnitModel>>;
    property: PropertyModel;
    isNew: boolean;
};

export const RentalUnitForm = ({
    currentRentalUnit,
    setCurrentRentalUnit,
    property,
    isNew,
}: RentalUnitFormProps) => {
    const sharedCssClasses = useSharedStyles();

    const dispatch = useAppDispatch();
    const history = useHistory();

    const submitFunc = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(createOrUpdateRentalUnit(currentRentalUnit));
        if (isNew) {
            history.push(routes.getPropertyDetailRouteById(property.id));
        }
    };

    const handleCancel = () => {
        history.push(routes.getPropertyDetailRouteById(property.id));
    };

    const { handleBasicInputChange, handleSubmit, isFormDirty } = useForms<RentalUnitModel>(
        setCurrentRentalUnit,
        currentRentalUnit,
        submitFunc
    );

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
                    defaultValue={getDisplayNameOfProperty(property)}
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
                        value={currentRentalUnit.ewid}
                        onChange={(e) => handleBasicInputChange(e)}
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
                        value={currentRentalUnit.type}
                        onChange={(e) => handleBasicInputChange(e, 'type')}
                    >
                        {rentalUnitType.map((rut) => (
                            <MenuItem key={rut} value={rut}>
                                {rut}
                            </MenuItem>
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
                    value={currentRentalUnit.numberOfRooms}
                    onChange={(e) => handleBasicInputChange(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'surfaceInM2'}
                    label={'Surface in m2'}
                    type="number"
                    value={currentRentalUnit.surfaceInM2}
                    onChange={(e) => handleBasicInputChange(e)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id={'floorLevel'}
                    select
                    label="Select"
                    helperText="Select a floor level"
                    variant="outlined"
                    fullWidth
                    value={currentRentalUnit.floorLevel}
                    onChange={(e) => handleBasicInputChange(e, 'floorLevel')}
                >
                    {rentalUnitfloorLevel.map((rufl) => (
                        <MenuItem key={rufl} value={rufl}>
                            {rufl}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <FormSubmitBar disableSubmit={!isFormDirty} handleCancel={() => handleCancel()} />
        </Grid>
    );
};
