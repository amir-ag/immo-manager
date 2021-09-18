import React from 'react';
import {
    Grid, Hidden,
    makeStyles,
} from "@material-ui/core";
import {ReactComponent as UrbanDesign} from "../../assets/svg/undraw_urban_design_kpu8.svg";
import {HomeProps} from "./types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from "../../routes/constant";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    left: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        alignItems: "flex-end",
    }
}));

const Home = ({handleSignIn, handleSignUp}: HomeProps) => {

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <Hidden only='xs'>
                <Grid item xs={false} sm={4} md={7} className={classes.left}>
                    <UrbanDesign/>
                </Grid>
            </Hidden>
            {
                <Router>
                    <Switch>
                        <Route exact path={routes.HOME}>
                            <SignIn handleSignIn={handleSignIn}/>
                        </Route>
                        <Route path={routes.SIGNUP}>
                            <SignUp handleSignUp={handleSignUp}/>
                        </Route>
                    </Switch>
                </Router>
            }
        </Grid>
    )
};

export default Home;
