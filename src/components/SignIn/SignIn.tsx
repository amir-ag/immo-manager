import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { SignInProps } from './types';
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
        backgroundColor: theme.palette.secondary.main,
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

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignIn(state);
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component={'h1'} variant={'h5'}>
                    Sign in
                </Typography>
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
                            <Link href={'#'} variant={'body2'}>
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
