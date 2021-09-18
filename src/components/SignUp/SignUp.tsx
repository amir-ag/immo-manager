import React, {useState} from 'react';
import {Avatar, Box, Button, Grid, Link, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import {SignUpProps} from "./types";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
    }
}));


const SignUp = ({handleSignUp}: SignUpProps) => {

    const classes = useStyles();

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    Sign up
                </Typography>
                <Box component={"form"} className={classes.form} onSubmit={() => handleSignUp(state)}
                     sx={{mt: 3}}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={state.firstName}
                                onChange={(e) => onChange(e)}
                                variant={"outlined"}
                                margin={"normal"}
                                fullWidth
                                id={"firstName"}
                                label={"Firstname"}
                                name={"firstname"}
                                autoComplete={"firstname"}
                                autoFocus
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={state.lastName}
                                onChange={(e) => onChange(e)}
                                variant={"outlined"}
                                margin={"normal"}
                                fullWidth
                                id={"lastName"}
                                label={"Lastname"}
                                name={"lastname"}
                                autoComplete={"lastname"}
                                // required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={state.email}
                                onChange={(e) => onChange(e)}
                                variant={"outlined"}
                                margin={"normal"}
                                fullWidth
                                id={"email"}
                                label={"Email"}
                                name={"email"}
                                autoComplete={"email"}
                                // required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={state.password}
                                onChange={(e) => onChange(e)}
                                variant={"outlined"}
                                margin={"normal"}
                                fullWidth
                                id={"password"}
                                label={"Password"}
                                name={"password"}
                                autoComplete={"password"}
                                // required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        className={classes.submit}
                        color={"primary"}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to={"/"} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Grid>
    );
};

export default SignUp;
