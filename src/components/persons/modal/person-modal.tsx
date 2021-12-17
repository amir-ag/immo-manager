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
import { PersonModel } from '../models/person.model';

export type PersonModalProps = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLElement>) => void;
    currentPerson: PersonModel;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeAddress: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeRole: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
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
    company: {
        margin: 0,
    },
    submit: {
        marginTop: '5%',
    },
    selectRole: {
        width: '100%',
    },
}));

const PersonModal = ({
    openModal,
    setOpenModal,
    handleSubmit,
    currentPerson,
    onChange,
    onChangeAddress,
    onChangeRole,
    onChangeDate,
    roles,
}: PersonModalProps) => {
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
                        {currentPerson.id ? `Edit existing person` : 'Add a new person'}
                    </Typography>
                    <Box component={'form'} onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.company}
                                    value={currentPerson.company}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'company'}
                                    label={'Company (optional)'}
                                    name={'company'}
                                    autoComplete={'company'}
                                    autoFocus
                                    type={'string'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* TODO: Field needs to be multi-select because person can have multiple roles */}
                                <TextField
                                    className={classes.selectRole}
                                    id={'role'}
                                    select
                                    label="Select"
                                    value={currentPerson.role}
                                    onChange={(e) => onChangeRole(e)}
                                    helperText="Please select your clients role"
                                    variant="outlined"
                                    required
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
                                    value={currentPerson.firstName}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'firstName'}
                                    label={'Firstname'}
                                    name={'firstname'}
                                    autoComplete={'firstname'}
                                    autoFocus
                                    type={'string'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={currentPerson.lastName}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'lastName'}
                                    label={'Lastname'}
                                    name={'lastname'}
                                    autoComplete={'lastname'}
                                    type={'string'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    onChange={(e) => onChangeDate(e)}
                                    className={classes.date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    value={currentPerson.address.addressLine1}
                                    onChange={(e) => onChangeAddress(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'addressLine1'}
                                    label={'Street, Number'}
                                    name={'addressLine1'}
                                    autoComplete={'street'}
                                    type={'string'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    value={currentPerson.address.postCode}
                                    onChange={(e) => onChangeAddress(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'postCode'}
                                    label={'PLZ'}
                                    name={'postCode'}
                                    autoComplete={'postCode'}
                                    type={'number'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    value={currentPerson.address.city}
                                    onChange={(e) => onChangeAddress(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'city'}
                                    label={'City'}
                                    name={'city'}
                                    autoComplete={'city'}
                                    type={'string'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={currentPerson.email}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    autoComplete={'email'}
                                    type={'email'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={currentPerson.mobilePhone}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'mobilePhone'}
                                    label={'Mobile Phone'}
                                    name={'mobilephone'}
                                    autoComplete={'mobilephone'}
                                    type={'number'}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={currentPerson.landline}
                                    onChange={(e) => onChange(e)}
                                    variant={'outlined'}
                                    margin={'normal'}
                                    fullWidth
                                    id={'landline'}
                                    label={'Landline'}
                                    name={'landline'}
                                    autoComplete={'landline'}
                                    type={'number'}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.submit}
                            color={'primary'}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default PersonModal;
