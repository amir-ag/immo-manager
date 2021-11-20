import React from 'react';
import { Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/user.slice';

const useStyles = makeStyles(() => ({
    profile: {
        height: '50vh',
    },
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
}));

const Profile = () => {
    const classes = useStyles();
    console.log('user: ', useAppSelector(selectUser));
    const { firstName, lastName, email } = useAppSelector(selectUser);

    return (
        <Container className={classes.profile} component={Paper} elevation={0}>
            <Typography variant={'h4'}>Profile</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'body2'}>General Info</Typography>
                    <TextField
                        value={firstName}
                        // onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'firstName'}
                        label={'Firstname'}
                        name={'firstname'}
                        autoComplete={'firstname'}
                        autoFocus
                        // required
                    />
                    <TextField
                        value={lastName}
                        // onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastname'}
                        autoComplete={'lastname'}
                        // required
                    />
                    <TextField
                        value={email}
                        // onChange={(e) => onChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'email'}
                        label={'Email'}
                        name={'email'}
                        autoComplete={'email'}
                        // required
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
        </Container>
    );
};

export default Profile;
