import React, {useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade, Grid,
    makeStyles, MenuItem,
    Modal,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {grey} from "@material-ui/core/colors";


const roles = [
    {
        value: 'Owner',
    },
    {
        value: 'Tenant',
    },
    {
        value: 'Service Provider',
    },
    {
        value: 'Wait list',
    },
];



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
    },
    header: {
        flexGrow: 1,
    },
    headerContainer: {
        display: 'flex',
        borderBottom: `1px solid ${grey[300]}`,
        padding: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: 600,
    },
}))

const People = () => {

    const [openModal, setOpenModal] = useState(false);
    const [state, setState] = useState({
            firstName: '',
            lastName: '',
            street: '',
            houseNumber: '',
            city: '',
            phone: '',
            role: ''
        }
    )

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onChangeID = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            "role": e.target.value
        }))
    }

    const handleSubmit = () => {
        console.log('submitting..')
    }


    const classes = useStyles();

    return (
        <Paper elevation={0}>
            <Container className={classes.headerContainer} maxWidth="xl">
                <Typography variant={"h6"} className={classes.header}>
                    Create new People
                </Typography>
                <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<AddIcon/>}
                >
                    New
                </Button>
            </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Create a new Person
                        </Typography>
                        <Box component={"form"} onSubmit={handleSubmit}
                             sx={{mt: 3}}>
                            <Grid container spacing={2}>
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
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        value={state.street}
                                        onChange={(e) => onChange(e)}
                                        variant={"outlined"}
                                        margin={"normal"}
                                        fullWidth
                                        id={"street"}
                                        label={"Street"}
                                        name={"street"}
                                        autoComplete={"street"}
                                        // required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        value={state.houseNumber}
                                        onChange={(e) => onChange(e)}
                                        variant={"outlined"}
                                        margin={"normal"}
                                        fullWidth
                                        id={"houseNumber"}
                                        label={"House No"}
                                        name={"houseNumber"}
                                        autoComplete={"houseNumber"}
                                        // required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={state.city}
                                        onChange={(e) => onChange(e)}
                                        variant={"outlined"}
                                        margin={"normal"}
                                        fullWidth
                                        id={"city"}
                                        label={"City"}
                                        name={"city"}
                                        autoComplete={"city"}
                                        // required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={state.phone}
                                        onChange={(e) => onChange(e)}
                                        variant={"outlined"}
                                        margin={"normal"}
                                        fullWidth
                                        id={"phone"}
                                        label={"Phone"}
                                        name={"phone"}
                                        autoComplete={"phone"}
                                        // required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id={"role"}
                                        select
                                        label="Select"
                                        value={state.role}
                                        onChange={(e) => onChangeID(e)}
                                        helperText="Please select your clients role"
                                        variant="outlined"
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.value} value={role.value}>
                                                {role.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                            <Button color={"primary"} type="submit" fullWidth variant="contained" >
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </Paper>
    );
};

export default People;
