import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { emptyRentalUnit } from './model/rental-unit.model';
import { gridSpacingBig } from '../../theming/theming-constants';
import { RentalUnitForm } from './rental-unit-form';
import { TenanciesOverview } from '../tenancy/overview/tenancies-overview';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { selectCurrentProperty, selectRentalUnitById } from '../../store/selectors';
import { emptyProperty } from '../property/model/property.model';
import { propertiesSlice } from '../../store/slices/properties.slice';
import { rentalUnitsSlice } from '../../store/slices/rental-units.slice';
import { IntroHeader } from '../ui/intro-header/intro-header';
import * as rentalUnitService from './service/rental-unit.service';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';

export const RentalUnitDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const rentalUnitToEdit = useAppSelector(selectRentalUnitById(id));
    const property = useAppSelector(selectCurrentProperty) ?? emptyProperty;

    const [currentRentalUnit, setCurrentRentalUnit] = useState(
        !isNew && rentalUnitToEdit ? { ...rentalUnitToEdit } : { ...emptyRentalUnit, propertyId: property.id }
    );

    useEffect(() => {
        if (!isNew) {
            dispatch(rentalUnitsSlice.actions.setCurrentRentalUnit(currentRentalUnit));
            dispatch(propertiesSlice.actions.setCurrentProperty(property));
        }
        // eslint-disable-next-line
    }, [currentRentalUnit, isNew, dispatch]);

    return (
        <>
            <IntroHeader
                title={isNew ? 'Create Rental Unit' : 'Edit Rental Unit'}
                subtitle={
                    isNew
                        ? 'Create a new rental unit'
                        : rentalUnitToEdit
                        ? rentalUnitService.getDisplayNameOfRentalUnit(rentalUnitToEdit)
                        : 'Rental unit has not been found!'
                }
            />
            <Grid container spacing={gridSpacingBig}>
                <RentalUnitForm
                    currentRentalUnit={currentRentalUnit}
                    setCurrentRentalUnit={setCurrentRentalUnit}
                    isNew={isNew}
                    property={property}
                />

                <TenanciesOverview
                    disableCreate={isNew || !rentalUnitToEdit}
                    relatedRentalUnit={currentRentalUnit}
                />
            </Grid>
        </>
    );
};
