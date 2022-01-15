import React from 'react';
import { Grid, Hidden, makeStyles, Paper } from '@material-ui/core';
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
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const Home = ({ handleLogin, handleSignUp, handlePwReset }: HomeProps) => {
    const cssClasses = useStyles();

    return (
        <Grid container component="main" className={cssClasses.root}>
            <Hidden only="xs">
                <Grid item xs={false} sm={4} md={7} className={cssClasses.left}>
                    <UrbanDesign />
                </Grid>
            </Hidden>
            {
                <Router>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={cssClasses.paper}>
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
                        </div>
                    </Grid>
                </Router>
            }
        </Grid>
    );
};

export default Home;
