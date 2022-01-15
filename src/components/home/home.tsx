import React from 'react';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import { ReactComponent as UrbanDesign } from '../../assets/svg/home.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '../../routes/route-constants';
import Login from './login/login';
import SignUp from './sign-up/sign-up';
import ResetPassword from './reset-password/reset-password';
import { LoginModel } from './login/model/login.model';
import { SignUpModel } from './sign-up/model/sign-up.model';
import { ResetPwModel } from './reset-password/model/reset-password.model';

export interface HomeProps {
    handleLogin: (loginData: LoginModel) => void;
    handleSignUp: (signUpData: SignUpModel) => void;
    handlePwReset: (resetPwData: ResetPwModel) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    left: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        alignItems: 'flex-end',
    },
}));

const Home = ({ handleLogin, handleSignUp, handlePwReset }: HomeProps) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <Hidden only="xs">
                <Grid item xs={false} sm={4} md={7} className={classes.left}>
                    <UrbanDesign />
                </Grid>
            </Hidden>
            {
                <Router>
                    <Switch>
                        <Route exact path={routes.HOME}>
                            <Login handleSignIn={handleLogin} />
                        </Route>
                        <Route path={routes.SIGN_UP}>
                            <SignUp handleSignUp={handleSignUp} />
                        </Route>
                        <Route path={routes.RESET_PW}>
                            <ResetPassword handleReset={handlePwReset} />
                        </Route>
                    </Switch>
                </Router>
            }
        </Grid>
    );
};

export default Home;
