import React, { useState } from 'react';
import { Avatar, Button, Grid, Link, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import SettingsBackupRestoreOutlinedIcon from '@material-ui/icons/SettingsBackupRestoreOutlined';
import { Link as RouterLink } from 'react-router-dom';
import routes from '../../routes/route-constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export type ResetPasswordProps = {
    handleReset: (email: string) => void;
};

const ResetPassword = ({ handleReset }: ResetPasswordProps) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleReset(email);
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SettingsBackupRestoreOutlinedIcon />
                </Avatar>
                <Typography component={'h1'} variant={'h5'}>
                    Reset PW
                </Typography>
                <form className={classes.form} noValidate autoComplete={'off'} onSubmit={onSubmit}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'email'}
                        label={'Email Address'}
                        name={'email'}
                        autoComplete={'email'}
                        autoFocus
                        required
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        className={classes.submit}
                    >
                        Send me a reset password email
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to={routes.HOME} variant={'body2'}>
                                Back
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    );
};

export default ResetPassword;
