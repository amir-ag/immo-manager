import React, { useState } from 'react';
import { Button, Grid, Link, makeStyles, Paper, TextField, useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import SettingsBackupRestoreOutlinedIcon from '@material-ui/icons/SettingsBackupRestoreOutlined';
import { emailPattern } from '../../../constants';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    const theme = useTheme();
    const [email, setEmail] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleReset(email);
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {/* TODO: Move this to the home component (grid and div) */}
            <div className={classes.paper}>
                <HomeHeader
                    iconBackgroundColor={theme.palette.primary.main}
                    icon={<SettingsBackupRestoreOutlinedIcon />}
                    title="Reset Password"
                />
                {/* TODO: Use grid container here */}
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'email'}
                        label={'Email Address'}
                        name={'email'}
                        type={'email'}
                        inputProps={{ pattern: emailPattern }}
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
