import React from 'react';
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid, Link,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ReactComponent as UrbanDesign} from "../../assets/svg/undraw_urban_design_kpu8.svg";
import {Props} from "./types";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    left: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        alignItems: "flex-end",
    },
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
    }
}));


const Home = ({handleSubmit}: Props) => {

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.left}>
                <UrbanDesign/>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component={"h1"} variant={"h5"}>
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"email"}
                            label={"Email Address"}
                            name={"email"}
                            autoComplete={"email"}
                            autoFocus
                        />
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"password"}
                            label={"Password"}
                            name={"password"}
                            autoComplete={"current-password"}
                        />
                        <FormControlLabel control={<Checkbox value={"remember"} color={"primary"} />} label={"Remember me"}
                        />
                        <Button
                            type={"submit"}
                            fullWidth variant={"contained"}
                            color={"primary"}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"#"} variant={"body2"}>
                                Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={"#"} variant={"body2"}>
                                    {"Don't have an account? Sign up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
};

export default Home;
