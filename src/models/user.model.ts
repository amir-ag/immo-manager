import { AddressModel, emptyAddress } from './address.model';

export type UserModel = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    address: AddressModel;
};

export const emptyUser: UserModel = {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    address: emptyAddress,
};
