import { RootState } from './store';
import { getItemFromCollectionById } from '../services/collection-utils';
import * as rentalUnitService from '../components/rental-unit/service/rental-unit.service';
import * as tenancyService from '../components/tenancy/service/tenancy.service';

// users
export const selectUser = (state: RootState) => state.user;

// persons
export const selectAllPersons = (state: RootState) => state.persons;
export const selectPersonById = (id: string) => {
    return (state: RootState) => getItemFromCollectionById(id, state.persons);
};
export const selectOwners = (state: RootState) => state.persons.filter((p) => p.roles?.includes('Owner'));
export const selectJanitors = (state: RootState) => state.persons.filter((p) => p.roles?.includes('Janitor'));
export const selectTenants = (state: RootState) => state.persons.filter((p) => p.roles?.includes('Tenant'));

// properties
export const selectAllProperties = (state: RootState) => state.properties.all;
export const selectPropertyById = (id: string) => {
    return (state: RootState) => getItemFromCollectionById(id, state.properties.all);
};
export const selectCurrentProperty = (state: RootState) => state.properties.current;

// rental units
export const selectAllRentalUnits = (state: RootState) => state.rentalUnits.all;
export const selectRentalUnitById = (id: string) => {
    return (state: RootState) => getItemFromCollectionById(id, state.rentalUnits.all);
};
export const selectRentalUnitsByPropertyId = (propertyId: string) => {
    return (state: RootState) =>
        rentalUnitService.getRentalUnitsByPropertyId(propertyId, state.rentalUnits.all);
};
export const selectCurrentRentalUnit = (state: RootState) => state.rentalUnits.current;

// tenancies
export const selectAllTenancies = (state: RootState) => state.tenancies;
export const selectTenancyById = (id: string) => {
    return (state: RootState) => getItemFromCollectionById(id, state.tenancies);
};
export const selectTenanciesByRentalUnitId = (ruId: string) => {
    return (state: RootState) => tenancyService.getTenanciesByRentalUnitId(ruId, state.tenancies);
};

// notificator
export const selectNotificator = (state: RootState) => state.notificator;
