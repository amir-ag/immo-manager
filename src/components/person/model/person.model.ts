import { AddressModel, emptyAddress } from '../../../models/address.model';

export type PersonModel = {
    id: string;
    company?: string;
    firstName: string;
    lastName: string;
    birthday?: string;
    address: AddressModel;
    email: string;
    mobilePhone: string;
    landline?: string;
    roles: typeof personRoles[number][];
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
    mobilePhone: '',
    landline: '',
    roles: [],
};
