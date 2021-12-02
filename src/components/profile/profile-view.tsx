import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/user.slice';
import { DropzoneArea } from 'material-ui-dropzone';
import { ProfileFormData } from './profile.container';
import { getAuth } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    rightTop: {
        height: '50%',
    },
    rightBottom: {
        height: '50%',
    },
    dropzone: {
        minHeight: '200px',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

type ProfileProps = {
    handleSubmit: (formData: ProfileFormData) => void;
};

const Profile = ({ handleSubmit }: ProfileProps) => {
    const classes = useStyles();
    const auth = getAuth();
    const user = auth.currentUser;

    const { firstName, lastName, email } = useAppSelector(selectUser);

    const [formData, setFormData] = useState<ProfileFormData>({
        image: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
    });

    const onImageChange = (images: File[]) => {
        setFormData((prevState) => ({
            ...prevState,
            image: images[0],
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = () => {
        handleSubmit(formData);
    };

    return (
        <Container component={Paper} elevation={0}>
            <Typography variant={'h4'}>Profile</Typography>
            <Grid container spacing={2} component={'form'}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'body2'}>General Info</Typography>
                    {user?.photoURL && (
                        <div className={classes.avatarContainer}>
                            <Avatar className={classes.avatar} src={user.photoURL} />
                        </div>
                    )}
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={'Drag and drop your profile image here'}
                        onChange={(images) => onImageChange(images)}
                    />
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
                    <div className={classes.rightTop}>
                        <Typography variant={'body2'}>Address</Typography>
                    </div>
                    <div className={classes.rightBottom}>
                        <Typography variant={'body2'}>Password</Typography>
                    </div>
                </Grid>
            </Grid>
            <Button onClick={onSubmit}>Update</Button>
        </Container>
    );
};

export default Profile;
