import React, { useState } from 'react';
import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from '../../hooks/store.hooks';
import { getAuth } from 'firebase/auth';
import { selectUser } from '../../store/selectors';
import ImageUpload from '../forms/image-upload/image-upload';
import { emptyUser, UserModel } from './model/user.model';

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

type ProfileFormProps = {
    handleSubmit: (formData: UserModel) => void;
};

const ProfileForm = ({ handleSubmit }: ProfileFormProps) => {
    const classes = useStyles();
    const auth = getAuth();
    const user = auth.currentUser;

    const { firstName, lastName, email, address } = useAppSelector(selectUser);

    const [formData, setFormData] = useState<UserModel>({
        ...emptyUser,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
    });

    const onImageChange = (image: File) => {
        setFormData((prevState) => ({
            ...prevState,
            image: image,
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    const onSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <>
            <Grid container spacing={2} component={'form'}>
                <Grid item xs={12} sm={6} className={classes.general}>
                    <Typography className={classes.generalTitle} variant={'body2'}>
                        General Info
                    </Typography>
                    <ImageUpload previewImageUrl={user?.photoURL} handleImageChange={onImageChange} />
                    <TextField
                        value={formData.firstName}
                        onChange={(e) => onChange(e)}
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
                        value={formData.lastName}
                        onChange={(e) => onChange(e)}
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
                        value={formData.email}
                        onChange={(e) => onChange(e)}
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
                            value={formData.address.addressLine1}
                            onChange={(e) => onChangeAddress(e)}
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
                            value={formData.address.postCode}
                            onChange={(e) => onChangeAddress(e)}
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
                            value={formData.address.city}
                            onChange={(e) => onChangeAddress(e)}
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
                            value={formData.newPassword}
                            onChange={(e) => onChange(e)}
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
                            value={formData.newPasswordConfirm}
                            onChange={(e) => onChange(e)}
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
            <Button className={classes.button} variant={'contained'} color={'primary'} onClick={onSubmit}>
                Update
            </Button>
        </>
    );
};

export default ProfileForm;
