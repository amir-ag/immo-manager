import React, { FormEvent, useState } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { getAuth } from 'firebase/auth';
import { selectUser } from '../../store/selectors';
import ImageUpload from '../forms/image-upload/image-upload';
import { useForms } from '../../hooks/use-forms.hook';
import { updateUser } from '../../store/slices/user.slice';
import { gridSpacingBig } from '../../theme/shared-styles';
import AddressFormFields from '../forms/address-form-fields/address-form-fields';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import { emptyProfile, ProfileModel } from './model/profile.model';
import { minPasswordLength, passwordLengthHint } from '../../constants';

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    const submitFunc = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(updateUser(userProfile));
    };

    const { firstName, lastName, email, address } = useAppSelector(selectUser);

    const [userProfile, setUserProfile] = useState<ProfileModel>({
        ...emptyProfile,
        uid: user?.uid ?? '',
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
    } = useForms<ProfileModel>(setUserProfile, userProfile, submitFunc);

    return (
        <Grid
            component={'form'}
            onSubmit={(e: React.FormEvent<HTMLElement>) => handleSubmit(e)}
            container
            spacing={gridSpacingBig}
        >
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={gridSpacingBig}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <ImageUpload previewImageUrl={user?.photoURL} handleImageChange={handleThumbnailChange} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component={'h3'}>
                        Basic Info
                    </Typography>
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
                        variant={'outlined'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        disabled
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={gridSpacingBig}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <AddressFormFields
                    addressState={userProfile.address}
                    handleAddressInputChange={handleAddressInputChange}
                />
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component={'h3'}>
                        Security
                    </Typography>
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
                        helperText={passwordLengthHint}
                        inputProps={{ minLength: minPasswordLength }}
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
                        helperText={passwordLengthHint}
                        inputProps={{ minLength: minPasswordLength }}
                        required={(userProfile.newPassword?.length ?? 0) > 0}
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
