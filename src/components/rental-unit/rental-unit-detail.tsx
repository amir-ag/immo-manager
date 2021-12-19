import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { emptyRentalUnit, getDisplayNameOfRentalUnit } from './model/rental-unit.model';
import { stylingConstants } from '../../theme/shared-styles';
import { RentalUnitForm } from './rental-unit-form';
import { TenanciesOverview } from '../tenancy/overview/tenancies-overview';
import { useParams } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { selectRentalUnits } from '../../store/selectors';

export const RentalUnitDetail = ({ isNew, propertyId }: { isNew: boolean; propertyId: string }) => {
    const { id } = useParams<{ id: string }>();
    const rentalUnitToEdit = useAppSelector(selectRentalUnits).find((ru) => ru.id === id);

    const [currentRentalUnit, setCurrentRentalUnit] = useState(
        !isNew && rentalUnitToEdit ? { ...rentalUnitToEdit } : { ...emptyRentalUnit, propertyId }
    );

    return (
        <>
            <Typography variant={'h5'}>
                {rentalUnitToEdit
                    ? getDisplayNameOfRentalUnit(rentalUnitToEdit)
                    : `Create new Property${!isNew ? ' (Property to edit has not been found!)' : ''}`}{' '}
            </Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
                <RentalUnitForm
                    currentRentalUnit={currentRentalUnit}
                    setCurrentRentalUnit={setCurrentRentalUnit}
                    isNew={isNew}
                    propertyId={propertyId}
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
