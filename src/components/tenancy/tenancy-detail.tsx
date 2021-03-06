import React, { useState } from 'react';
import { emptyTenancy } from './model/tenancy.model';
import { TenancyForm } from './tenancy-form';
import { useParams } from 'react-router';
import {
    selectCurrentProperty,
    selectCurrentRentalUnit,
    selectTenancyById,
    selectTenants,
} from '../../store/selectors';
import { emptyProperty } from '../property/model/property.model';
import { emptyRentalUnit } from '../rental-unit/model/rental-unit.model';
import { IntroHeader } from '../ui/intro-header/intro-header';
import * as tenancyService from './service/tenancy.service';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';

export const TenancyDetail = ({ isNew }: { isNew: boolean }) => {
    const { id } = useParams<{ id: string }>();
    const tenancyToEdit = useAppSelector(selectTenancyById(id));

    const property = useAppSelector(selectCurrentProperty) ?? emptyProperty;
    const rentalUnit = useAppSelector(selectCurrentRentalUnit) ?? emptyRentalUnit;

    const tenants = useAppSelector(selectTenants);

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
                        ? tenancyService.getDisplayNameOfTenancy(tenancyToEdit, tenants)
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
