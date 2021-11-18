import React from 'react';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/user.slice';

const useStyles = makeStyles(() => ({
    profile: {
        height: '50vh',
    },
    mainContainer: {
        display: 'flex',
        height: '95%',
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

    return (
        <div className={classes.profile}>
            <Typography variant={'h4'}>Profile</Typography>
            <Container className={classes.mainContainer} component={Paper} elevation={0}>
                <Container>
                    <Typography variant={'body2'}>General Info</Typography>
                </Container>
                <Container className={classes.rightContainer}>
                    <div className={classes.rightTop}>
                        <Typography variant={'body2'}>Address</Typography>
                    </div>
                    <div className={classes.rightBottom}>
                        <Typography variant={'body2'}>Password</Typography>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default Profile;
