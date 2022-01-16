import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Link, TextField, useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import { emailPattern } from '../../../constants';
import { emptyLogin, LoginModel } from './model/login.model';
import { useForms } from '../../../hooks/use-forms.hook';
import { gridSpacingSmall } from '../../../theme/shared-styles';

export type SignInProps = {
    handleSignIn: (state: LoginModel) => void;
};

const Login = ({ handleSignIn }: SignInProps) => {
    const theme = useTheme();
    const [loginFormState, setLoginFormState] = useState(emptyLogin);

    const submitFunc = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        handleSignIn(loginFormState);
    };

    const { handleBasicInputChange, handleSubmit } = useForms<LoginModel>(
        setLoginFormState,
        loginFormState,
        submitFunc
    );

    return (
        <>
            <HomeHeader
                iconBackgroundColor={theme.palette.secondary.main}
                icon={<LockOutlinedIcon />}
                title="Sign in"
            />
            <Grid container spacing={gridSpacingSmall} component={'form'} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <TextField
                        value={loginFormState.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'email'}
                        label={'Email Address'}
                        name={'email'}
                        autoComplete={'email'}
                        type={'email'}
                        inputProps={{ pattern: emailPattern }}
                        autoFocus
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={loginFormState.password}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        fullWidth
                        id={'password'}
                        type={'password'}
                        label={'Password'}
                        name={'password'}
                        autoComplete={'current-password'}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value={'remember'} color={'primary'} />}
                        label={'Remember me'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs>
                    <Link component={RouterLink} to={routes.RESET_PW} variant={'body2'}>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={routes.SIGN_UP} variant={'body2'}>
                        {"Don't have an account? Sign up"}
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
