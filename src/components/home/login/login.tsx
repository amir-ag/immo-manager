import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    useTheme,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import routes from '../../../routes/route-constants';
import { HomeHeader } from '../home-header';
import { emailPattern } from '../../../constants';
import { emptyLogin, LoginModel } from './model/login.model';
import { useForms } from '../../../hooks/use-forms.hook';

export type SignInProps = {
    handleSignIn: (state: LoginModel) => void;
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

const Login = ({ handleSignIn }: SignInProps) => {
    const classes = useStyles();
    const theme = useTheme();

    const [loginFormState, setLoginFormState] = useState(emptyLogin);

    const submitFunc = (e: React.FormEvent<any>) => {
        e.preventDefault();
        handleSignIn(loginFormState);
    };

    const { handleBasicInputChange, handleSubmit } = useForms<LoginModel>(
        setLoginFormState,
        loginFormState,
        submitFunc
    );

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {/* TODO: Move this to the home component (grid and div) */}
            <div className={classes.paper}>
                <HomeHeader
                    iconBackgroundColor={theme.palette.secondary.main}
                    icon={<LockOutlinedIcon />}
                    title="Sign in"
                />
                {/* TODO: Use grid container here */}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        value={loginFormState.email}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
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
                    <TextField
                        value={loginFormState.password}
                        onChange={(e) => handleBasicInputChange(e)}
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'password'}
                        type={'password'}
                        label={'Password'}
                        name={'password'}
                        autoComplete={'current-password'}
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox value={'remember'} color={'primary'} />}
                        label={'Remember me'}
                    />
                    <Button
                        type={'submit'}
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
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
                </form>
            </div>
        </Grid>
    );
};

export default Login;
