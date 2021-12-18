import { RootState } from './store';

export const selectUser = (state: RootState) => state.user;

export const selectPersons = (state: RootState) => state.persons;
export const selectPersonsOwners = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Owner'));
export const selectPersonsServiceProviders = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Service Provider'));
export const selectPersonsTenants = (state: RootState) =>
    state.persons.filter((p) => p.role.includes('Tenant'));

export const selectProperties = (state: RootState) => state.properties;
