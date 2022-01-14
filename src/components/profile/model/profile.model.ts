import { emptyUser, UserModel } from '../../../models/user.model';
import { ThumbnailModel } from '../../../models/thumbnail.model';

export type ProfileModel = UserModel & {
    thumbnail?: ThumbnailModel;
    newPassword?: string;
    newPasswordConfirm?: string;
};

export const emptyProfile: ProfileModel = {
    ...emptyUser,
    newPassword: '',
    newPasswordConfirm: '',
};
