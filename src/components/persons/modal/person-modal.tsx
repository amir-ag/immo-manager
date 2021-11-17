import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    makeStyles,
    MenuItem,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';

type ModalState = {
    firstName: string;
    lastName: string;
    birthday?: string | null;
    street: string;
    houseNumber: string;
    zip: number | null;
    city: string;
    email: string;
    mobilePhone: number | null;
    landline?: number | null;
    role: string;
    type: string;
};

export type PeopleModalProps = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLElement>) => void;
    state: ModalState;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeRole: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeType: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeDate: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    roles: { value: string }[];
};

const useStyles = makeStyles((theme) => ({
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
    date: {
        width: '100%',
    },
}));

const PersonModal = ({
    openModal,
    setOpenModal,
    handleSubmit,
    state,
    onChange,
    onChangeRole,
    onChangeType,
    onChangeDate,
    roles,
}: PeopleModalProps) => {
    const classes = useStyles();

    return (
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
                    <Box component={'form'} onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id={'type'}
                                    select
                                    label="Select"
                                    value={state.type}
                                    onChange={(e) => onChangeType(e)}
                                    helperText="Type of person"
                                    variant="outlined"
                                >
                                    <MenuItem value="Unternehmen">{'Unternehmen'}</MenuItem>
                                    <MenuItem value="Privatperson">{'Privatperson'}</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id={'role'}
                                    select
                                    label="Select"
                                    value={state.role}
                                    onChange={(e) => onChangeRole(e)}
                                    helperText="Please select your clients role"
                                    variant="outlined"
                                >
                                    {roles.map((role: { value: string }) => (
                                        <MenuItem key={role.value} value={role.value}>
                                            {role.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={state.firstName}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'firstName'}
                                    label={'Firstname'}
                                    name={'firstname'}
                                    autoComplete={'firstname'}
                                    autoFocus
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={state.lastName}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'lastName'}
                                    label={'Lastname'}
                                    name={'lastname'}
                                    autoComplete={'lastname'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="2000-06-15"
                                    onChange={(e) => onChangeDate(e)}
                                    className={classes.date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    value={state.street}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'street'}
                                    label={'Street'}
                                    name={'street'}
                                    autoComplete={'street'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    value={state.houseNumber}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'houseNumber'}
                                    label={'House No'}
                                    name={'houseNumber'}
                                    autoComplete={'houseNumber'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    value={state.zip}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'zip'}
                                    label={'PLZ'}
                                    name={'zip'}
                                    autoComplete={'zip'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    value={state.city}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'city'}
                                    label={'City'}
                                    name={'city'}
                                    autoComplete={'city'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={state.email}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    autoComplete={'email'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={state.mobilePhone}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'mobilePhone'}
                                    label={'Mobile Phone'}
                                    name={'mobilephone'}
                                    autoComplete={'mobilephone'}
                                    // required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={state.landline}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'landline'}
                                    label={'Landline'}
                                    name={'landline'}
                                    autoComplete={'landline'}
                                    // required
                                />
                            </Grid>
                        </Grid>
                        <Button color={'primary'} type="submit" fullWidth variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default PersonModal;
