import { AddressModel } from '../../models/address-model';

export type PropertyModel = {
    id: string;
    egid: string;
    owner: string;
    type: 'apartment building' | 'one family house';
    name: string;
    yearOfConstruction?: number;
    address: AddressModel;
};
