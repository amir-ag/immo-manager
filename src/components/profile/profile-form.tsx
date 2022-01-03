import React, { FormEvent, useState } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getAuth } from 'firebase/auth';
import { selectUser } from '../../store/selectors';
import ImageUpload from '../forms/image-upload/image-upload';
import { emptyUser, UserModel } from './model/user.model';
import { useForms } from '../../hooks/forms.hooks';
import { update } from '../../store/slices/user.slice';
import { stylingConstants } from '../../theme/shared-styles';
import AddressFormFields from '../forms/address-form-fields/address-form-fields';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    const submitFunc = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(update(userProfile));
    };

    const { firstName, lastName, email, address } = useAppSelector(selectUser);

    const [userProfile, setUserProfile] = useState<UserModel>({
        ...emptyUser,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
    });

    const {
        handleBasicInputChange,
        handleAddressInputChange,
        handleThumbnailChange,
        handleSubmit,
        isFormDirty,
    } = useForms<UserModel>(setUserProfile, userProfile, submitFunc);

    return (
        <Grid
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
            container
            spacing={stylingConstants.gridSpacing}
        >
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'h6'}>General Info</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ImageUpload previewImageUrl={user?.photoURL} handleImageChange={handleThumbnailChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={userProfile.firstName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'firstName'}
                        label={'Firstname'}
                        name={'firstname'}
                        autoComplete={'firstname'}
                        autoFocus
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={userProfile.lastName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastname'}
                        autoComplete={'lastname'}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={userProfile.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        autoComplete={'email'}
                        required
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Address</Typography>
                </Grid>
                <AddressFormFields
                    addressState={userProfile.address}
                    handleAddressInputChange={handleAddressInputChange}
                />
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Security</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        value={userProfile.newPassword}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'newPassword'}
                        label={'Enter new password'}
                        name={'password'}
                        autoComplete={'password'}
                        type={'password'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={userProfile.newPasswordConfirm}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'newPasswordConfirm'}
                        label={'Confirm Password'}
                        name={'newPasswordConfirm'}
                        autoComplete={'newPasswordConfirm'}
                        type={'password'}
                    />
                </Grid>
            </Grid>
            <FormSubmitBar
                hideCancel={true}
                disableSubmit={!isFormDirty}
                submitButtonText={'Update Profile'}
            />
        </Grid>
    );
};

export default ProfileForm;
