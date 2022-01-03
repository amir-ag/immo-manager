import { RootState } from './store';

// users
export const selectUser = (state: RootState) => state.user;

// persons
export const selectPersons = (state: RootState) => state.persons;
export const selectPersonsOwners = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Owner'));
export const selectPersonsServiceProviders = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Service Provider'));
export const selectPersonsTenants = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Tenant'));

// properties
export const selectProperties = (state: RootState) => state.properties.all;
export const selectCurrentProperty = (state: RootState) => state.properties.current;

// rental units
export const selectRentalUnits = (state: RootState) => state.rentalUnits.all;
export const selectCurrentRentalUnit = (state: RootState) => state.rentalUnits.current;

// tenancies
export const selectTenancies = (state: RootState) => state.tenancies;

// snackbar
export const selectSnackbar = (state: RootState) => state.snackbar;
