import React from 'react';
import ProfileForm from './profile-form';
import { useAppDispatch } from '../../hooks/store.hooks';
import { update } from '../../store/slices/user.slice';
import { UserModel } from './model/user.model';
import { Typography } from '@material-ui/core';

const ProfileDetail = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = (formData: UserModel) => {
        dispatch(update(formData));
    };

    return (
        <>
            <Typography variant={'h4'}>Profile</Typography>
            <ProfileForm handleSubmit={handleSubmit} />
        </>
    );
};

export default ProfileDetail;
