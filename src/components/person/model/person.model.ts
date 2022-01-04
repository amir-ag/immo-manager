import { AddressModel, emptyAddress } from '../../../models/address.model';

export type PersonModel = {
    id: string;
    company?: string;
    firstName: string;
    lastName: string;
    birthday?: string | null;
    address: AddressModel;
    email: string;
    mobilePhone: number | null;
    landline?: number | null;
    roles: typeof personRoles[number][];
    createdBy?: string;
};

export const personRoles = ['Owner', 'Tenant', 'Tenant Wait List', 'Janitor', 'Tradesman'] as const;

export const emptyPerson: PersonModel = {
    id: '',
    company: '',
    firstName: '',
    lastName: '',
    birthday: '',
    address: emptyAddress,
    email: '',
    mobilePhone: null,
    landline: null,
    roles: [],
    createdBy: '',
};

// Helper functions
export const getPersonDisplayNameForFormSelectFields = (person: PersonModel) => {
    if (person.id === '') {
        return '';
    }
    return `${person.firstName} ${person.lastName} (${person.address.city})`;
};
