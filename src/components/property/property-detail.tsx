import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { stylingConstants } from '../../theme/shared-styles';
import { PropertyForm } from './property-form';
import { RentalUnitsOverview } from '../rental-unit/overview/rental-units-overview';
import { useParams } from 'react-router';
import { emptyProperty } from './model/property.model';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { selectPropertyById } from '../../store/selectors';
import { propertiesSlice } from '../../store/slices/properties.slice';
import { rentalUnitsSlice } from '../../store/slices/rental-units.slice';
import { IntroHeader } from '../ui/intro-header/intro-header';
import * as propertyService from './service/property.service';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';

export const PropertyDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const propertyToEdit = useAppSelector(selectPropertyById(id));

    const [currentProperty, setCurrentProperty] = useState(
        !isNew && propertyToEdit ? { ...propertyToEdit } : { ...emptyProperty }
    );

    useEffect(() => {
        if (!isNew) {
            dispatch(propertiesSlice.actions.setCurrentProperty(currentProperty));
            // TODO: Integrate this action into the first one (combine)
            dispatch(rentalUnitsSlice.actions.setCurrentRentalUnit(null));
        }
    }, [currentProperty]);

    return (
        <>
            <IntroHeader
                title={isNew ? 'Create Property' : 'Edit Property'}
                subtitle={
                    isNew
                        ? 'Create a new property'
                        : propertyToEdit
                        ? propertyService.getDisplayNameOfProperty(propertyToEdit)
                        : 'Property has not been found!'
                }
            />
            <Grid container spacing={stylingConstants.gridSpacing}>
                <PropertyForm
                    currentProperty={currentProperty}
                    setCurrentProperty={setCurrentProperty}
                    isNew={isNew}
                />
                <RentalUnitsOverview
                    disableCreate={isNew || !propertyToEdit}
                    relatedProperty={currentProperty}
                />
            </Grid>
        </>
    );
};
