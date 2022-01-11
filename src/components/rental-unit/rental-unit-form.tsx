import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@material-ui/core';
import { rentalUnitfloorLevel, RentalUnitModel, rentalUnitType } from './model/rental-unit.model';
import { gridSpacing, useSharedStyles } from '../../theme/shared-styles';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { PropertyModel } from '../property/model/property.model';
import routes from '../../routes/route-constants';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { useHistory } from 'react-router';
import { createOrUpdateRentalUnit } from '../../store/slices/rental-units.slice';
import { useForms } from '../../hooks/use-forms.hook';
import * as propertyService from '../property/service/property.service';

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
            spacing={gridSpacing}
            alignItems={'center'}
            alignContent={'flex-start'}
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
        >
            <Grid item xs={12}>
                <Typography variant={'subtitle2'} component={'h3'}>
                    Basic Info
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'property'}
                    label={'Property'}
                    type="text"
                    defaultValue={propertyService.getDisplayNameOfProperty(property)}
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
                        value={currentRentalUnit.ewid === 0 ? '' : currentRentalUnit.ewid}
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
                        helperText="Select the unit type"
                        variant="outlined"
                        value={currentRentalUnit.type}
                        onChange={(e) => {
                            if (e.target.value === rentalUnitType[0]) {
                                setCurrentRentalUnit({
                                    ...currentRentalUnit,
                                    numberOfRooms: 0,
                                    surfaceInM2: 0,
                                    floorLevel: 'Undefined',
                                });
                            }

                            if (e.target.value === rentalUnitType[1]) {
                                setCurrentRentalUnit({
                                    ...currentRentalUnit,
                                    numberOfRooms: 1,
                                });
                            }

                            handleBasicInputChange(e, 'type');
                        }}
                        required
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
                    value={currentRentalUnit.numberOfRooms === 0 ? '' : currentRentalUnit.numberOfRooms}
                    onChange={(e) => handleBasicInputChange(e)}
                    disabled={currentRentalUnit.type === 'Parking Lot'}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'surfaceInM2'}
                    label={'Surface in m2'}
                    type="number"
                    value={currentRentalUnit.surfaceInM2 === 0 ? '' : currentRentalUnit.surfaceInM2}
                    onChange={(e) => handleBasicInputChange(e)}
                    disabled={currentRentalUnit.type === 'Parking Lot'}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id={'floorLevel'}
                    select
                    label="Select"
                    helperText="Select the floor level"
                    variant="outlined"
                    fullWidth
                    value={currentRentalUnit.floorLevel}
                    onChange={(e) => handleBasicInputChange(e, 'floorLevel')}
                    disabled={currentRentalUnit.type === 'Parking Lot'}
                    required={currentRentalUnit.type !== 'Parking Lot'}
                >
                    {rentalUnitfloorLevel.map((rufl) => (
                        <MenuItem key={rufl} value={rufl}>
                            {rufl}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <FormSubmitBar
                disableSubmit={!isFormDirty}
                handleCancel={() => handleCancel()}
                submitButtonText={isNew ? 'Create' : 'Update'}
            />
        </Grid>
    );
};
