import React, { useState } from 'react';
import { emptyTenancy, getDisplayNameOfTenancy } from './model/tenancy.model';
import { TenancyForm } from './tenancy-form';
import { useParams } from 'react-router';
import { useAppSelector } from '../../hooks/store.hooks';
import {
    selectCurrentProperty,
    selectCurrentRentalUnit,
    selectPersonsTenants,
    selectTenancies,
} from '../../store/selectors';
import { emptyProperty } from '../property/model/property.model';
import { emptyRentalUnit } from '../rental-unit/model/rental-unit.model';
import { IntroHeader } from '../ui/intro-header/intro-header';

export const TenancyDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const tenancyToEdit = useAppSelector(selectTenancies).find((t) => t.id === id);

    // TODO: Better error handling!
    const property = useAppSelector(selectCurrentProperty) ?? emptyProperty;
    const rentalUnit = useAppSelector(selectCurrentRentalUnit) ?? emptyRentalUnit;

    const tenants = useAppSelector(selectPersonsTenants);

    const [currentTenancy, setCurrentTenancy] = useState(
        !isNew && tenancyToEdit
            ? { ...tenancyToEdit }
            : { ...emptyTenancy, propertyId: property.id, rentalUnitId: rentalUnit.id }
    );

    return (
        <>
            <IntroHeader
                title={isNew ? 'Create Tenancy' : 'Edit Tenancy'}
                subtitle={
                    isNew
                        ? 'Create a new tenancy'
                        : tenancyToEdit
                        ? getDisplayNameOfTenancy(tenancyToEdit, tenants)
                        : 'Tenancy has not been found!'
                }
            />
            <TenancyForm
                currentTenancy={currentTenancy}
                setCurrentTenancy={setCurrentTenancy}
                property={property}
                rentalUnit={rentalUnit}
                tenants={tenants}
                isNew={isNew}
            />
        </>
    );
};
