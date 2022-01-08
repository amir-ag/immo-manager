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

export type SignInProps = {
    handleSignIn: (state: SignInState) => void;
};

export type SignInState = {
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

const SignIn = ({ handleSignIn }: SignInProps) => {
    const classes = useStyles();
    const theme = useTheme();

    // TODO: Use UserModel
    const [state, setState] = useState({
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
        handleSignIn(state);
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            {/* TODO: Move this to the home component (grid and div) */}
            <div className={classes.paper}>
                <HomeHeader
                    iconBackgroundColor={theme.palette.secondary.main}
                    icon={<LockOutlinedIcon />}
                    title="Sign in"
                />
                <form className={classes.form} noValidate autoComplete={'off'} onSubmit={(e) => onSubmit(e)}>
                    <TextField
                        value={state.email}
                        onChange={(e) => onChange(e)}
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
                    <TextField
                        value={state.password}
                        onChange={(e) => onChange(e)}
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
                            <Link component={RouterLink} to={routes.RESETPW} variant={'body2'}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to={routes.SIGNUP} variant={'body2'}>
                                {"Don't have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>
    );
};

export default SignIn;
