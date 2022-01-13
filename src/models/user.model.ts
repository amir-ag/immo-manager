import { AddressModel, emptyAddress } from './address.model';
import { ThumbnailModel } from './thumbnail.model';

export type UserModel = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    address: AddressModel;
    thumbnail?: ThumbnailModel;
    newPassword?: string;
    newPasswordConfirm?: string;
};

export const emptyUser: UserModel = {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    address: emptyAddress,
    newPassword: '',
    newPasswordConfirm: '',
};
