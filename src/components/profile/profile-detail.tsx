import React from 'react';
import ProfileForm from './profile-form';
import { IntroHeader } from '../ui/intro-header/intro-header';

const ProfileDetail = () => {
    return (
        <>
            <IntroHeader title="User Profile" subtitle="Adjust your user profile to your liking." />
            <ProfileForm />
        </>
    );
};

export default ProfileDetail;
