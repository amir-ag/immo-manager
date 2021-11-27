import { AddressModel } from '../../../models/address.model';

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
