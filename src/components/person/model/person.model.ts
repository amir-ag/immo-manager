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
    role: string;
    createdBy?: string;
};

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
    role: '',
    createdBy: '',
};

// Helper functions
export const getPersonDisplayNameForFormSelectFields = (person: PersonModel) => {
    if (person.id === '') {
        return '';
    }
    return `${person.firstName} ${person.lastName} (${person.address.city})`;
};
