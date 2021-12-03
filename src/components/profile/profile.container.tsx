import React from 'react';
import Profile from './profile-view';
import { useAppDispatch } from '../../store/hooks';
import { update } from '../../store/slices/user.slice';

export type ProfileFormData = {
    image: File | null;
    firstName: string;
    lastName: string;
    email: string;
};

const ProfileContainer = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (formData: ProfileFormData) => {
        dispatch(update(formData));
    };

    return <Profile handleSubmit={handleSubmit} />;
};

export default ProfileContainer;
