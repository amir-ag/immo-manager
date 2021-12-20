import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { emptyRentalUnit, getDisplayNameOfRentalUnit } from './model/rental-unit.model';
import { stylingConstants } from '../../theme/shared-styles';
import { RentalUnitForm } from './rental-unit-form';
import { TenanciesOverview } from '../tenancy/overview/tenancies-overview';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentProperty, selectRentalUnits } from '../../store/selectors';
import { emptyProperty } from '../property/model/property.model';
import { propertiesSlice } from '../../store/slices/properties.slice';
import { rentalUnitsSlice } from '../../store/slices/rental-units.slice';

export const RentalUnitDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const rentalUnitToEdit = useAppSelector(selectRentalUnits).find((ru) => ru.id === id);
    // TODO: Better error handling!
    const property = useAppSelector(selectCurrentProperty) ?? emptyProperty;

    const [currentRentalUnit, setCurrentRentalUnit] = useState(
        !isNew && rentalUnitToEdit ? { ...rentalUnitToEdit } : { ...emptyRentalUnit, propertyId: property.id }
    );

    useEffect(() => {
        if (!isNew) {
            dispatch(rentalUnitsSlice.actions.setCurrentRentalUnit(currentRentalUnit));
            // TODO: Integrate this action into the first one (combine)
            dispatch(propertiesSlice.actions.setCurrentProperty(property));
        }
    }, [currentRentalUnit]);

    return (
        <>
            <Typography variant={'h5'}>
                {rentalUnitToEdit
                    ? getDisplayNameOfRentalUnit(rentalUnitToEdit)
                    : `Create new Rental Unit${
                          !isNew ? ' (Rental Unit to edit has not been found!)' : ''
                      }`}{' '}
            </Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <RentalUnitForm
                    currentRentalUnit={currentRentalUnit}
                    setCurrentRentalUnit={setCurrentRentalUnit}
                    isNew={isNew}
                    property={property}
                />
                <Grid
                    item
                    container
                    xs={12}
                    sm={6}
                    spacing={stylingConstants.gridSpacing}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                >
                    <TenanciesOverview disableCreate={isNew || !rentalUnitToEdit} />
                </Grid>
            </Grid>
        </>
    );
};
