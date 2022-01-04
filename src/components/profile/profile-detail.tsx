import React from 'react';
import ProfileForm from './profile-form';
import { Typography } from '@material-ui/core';

const ProfileDetail = () => {
    return (
        <>
            <Typography variant={'h4'}>Profile</Typography>
            <ProfileForm />
        </>
    );
};

export default ProfileDetail;
