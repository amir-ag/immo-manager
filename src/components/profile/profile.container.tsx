import React from 'react';
import Profile from './profile-view';
import { useAppDispatch } from '../../store/hooks';
import { update } from '../../store/slices/user.slice';
import { AddressModel } from '../../models/address.model';

export type ProfileFormData = {
    image: File | null;
    firstName: string;
    lastName: string;
    email: string;
    address: AddressModel;
    newPassword?: string;
    newPasswordConfirm?: string;
};

const ProfileContainer = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (formData: ProfileFormData) => {
        dispatch(update(formData));
    };

    return <Profile handleSubmit={handleSubmit} />;
};

export default ProfileContainer;
