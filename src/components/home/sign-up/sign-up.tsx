import React, { useState } from 'react';
import { Button, Grid, Link, makeStyles, Paper, TextField, useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import { gridSpacing } from '../../../theme/shared-styles';
import { emailPattern } from '../../../constants';

export type SignUpProps = {
    handleSignUp: (state: SignUpState) => void;
};

export type SignUpState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

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

const SignUp = ({ handleSignUp }: SignUpProps) => {
    const classes = useStyles();
    const theme = useTheme();

    // TODO: Use UserModel
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // TODO: Use form hook
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // TODO: Use form hook
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignUp(state);
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {/* TODO: Move this to the home component (grid and div) */}
            <div className={classes.paper}>
                <HomeHeader
                    iconBackgroundColor={theme.palette.primary.main}
                    icon={<LockOutlinedIcon />}
                    title="Sign up"
                />
                <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={state.firstName}
                                onChange={(e) => onChange(e)}
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={state.lastName}
                                onChange={(e) => onChange(e)}
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
                                value={state.email}
                                onChange={(e) => onChange(e)}
                                variant={'outlined'}
                                fullWidth
                                id={'email'}
                                label={'Email'}
                                name={'email'}
                                type={'email'}
                                inputProps={{ pattern: emailPattern }}
                                autoComplete={'email'}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={state.password}
                                onChange={(e) => onChange(e)}
                                variant={'outlined'}
                                fullWidth
                                id={'password'}
                                type={'password'}
                                label={'Password'}
                                name={'password'}
                                autoComplete={'password'}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.submit}
                        color={'primary'}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={routes.HOME} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    );
};

export default SignUp;
