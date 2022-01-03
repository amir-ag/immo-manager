import React, { FormEvent, useState } from 'react';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getAuth } from 'firebase/auth';
import { selectUser } from '../../store/selectors';
import ImageUpload from '../forms/image-upload/image-upload';
import { emptyUser, UserModel } from './model/user.model';
import { useForms } from '../../hooks/forms.hooks';
import { update } from '../../store/slices/user.slice';

const useStyles = makeStyles((theme) => ({
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    general: {
        marginTop: theme.spacing(2),
    },
    generalTitle: {
        marginBottom: theme.spacing(2),
    },
    address: {
        marginTop: theme.spacing(2),
    },
    security: {
        marginTop: theme.spacing(4),
    },
    button: {
        width: '100%',
        margin: '5% 0',
    },
}));

const ProfileForm = () => {
    const classes = useStyles();
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
        <>
            <Grid container spacing={2} component={'form'}>
                <Grid item xs={12} sm={6} className={classes.general}>
                    <Typography className={classes.generalTitle} variant={'body2'}>
                        General Info
                    </Typography>
                    <ImageUpload previewImageUrl={user?.photoURL} handleImageChange={handleThumbnailChange} />
                    <TextField
                        value={userProfile.firstName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'firstName'}
                        label={'Firstname'}
                        name={'firstname'}
                        autoComplete={'firstname'}
                        autoFocus
                        required
                    />
                    <TextField
                        value={userProfile.lastName}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastname'}
                        autoComplete={'lastname'}
                        required
                    />
                    <TextField
                        value={userProfile.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        autoComplete={'email'}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.rightContainer}>
                    <div className={classes.address}>
                        <Typography variant={'body2'}>Address</Typography>
                        <TextField
                            value={userProfile.address.addressLine1}
                            onChange={(e) => handleAddressInputChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'addressLine1'}
                            label={'Street, Number'}
                            name={'addressLine1'}
                            autoComplete={'street'}
                            type={'string'}
                        />
                        <TextField
                            value={userProfile.address.postCode}
                            onChange={(e) => handleAddressInputChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'postCode'}
                            label={'PLZ'}
                            name={'postCode'}
                            autoComplete={'postCode'}
                            type={'number'}
                        />
                        <TextField
                            value={userProfile.address.city}
                            onChange={(e) => handleAddressInputChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'city'}
                            label={'City'}
                            name={'city'}
                            autoComplete={'city'}
                            type={'string'}
                        />
                    </div>
                    <div className={classes.security}>
                        <Typography variant={'body2'}>Account & Security</Typography>
                        <TextField
                            value={userProfile.newPassword}
                            onChange={(e) => handleBasicInputChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'newPassword'}
                            label={'Enter new password'}
                            name={'password'}
                            autoComplete={'password'}
                            type={'password'}
                        />
                        <TextField
                            value={userProfile.newPasswordConfirm}
                            onChange={(e) => handleBasicInputChange(e)}
                            variant={'outlined'}
                            margin={'normal'}
                            fullWidth
                            id={'newPasswordConfirm'}
                            label={'Confirm Password'}
                            name={'newPasswordConfirm'}
                            autoComplete={'newPasswordConfirm'}
                            type={'password'}
                        />
                    </div>
                </Grid>
            </Grid>
            <Button className={classes.button} variant={'contained'} color={'primary'} onClick={handleSubmit}>
                Update
            </Button>
        </>
    );
};

export default ProfileForm;
