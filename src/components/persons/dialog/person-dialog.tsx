import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    TextField,
    Toolbar,
    useTheme,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';

import { PersonModel } from '../models/person.model';

export type PersonModalProps = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (e: FormEvent<HTMLElement>) => void;
    currentPerson: PersonModel;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeAddress: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeRole: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    onChangeDate: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    roles: { value: string }[];
};

const useStyles = makeStyles({
    date: {
        width: '100%',
    },
    company: {
        margin: 0,
    },
    submit: {
        margin: '5% 0',
        width: '100%',
    },
    selectRole: {
        width: '100%',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
});

const PersonDialog = ({
    openDialog,
    setOpenDialog,
    handleSubmit,
    currentPerson,
    onChange,
    onChangeAddress,
    onChangeRole,
    onChangeDate,
    roles,
}: PersonModalProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="form-dialog-title"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <DialogTitle id="form-dialog-title" className={classes.title}>
                        {currentPerson.id ? `Edit existing person` : 'Add a new person'}
                    </DialogTitle>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setOpenDialog(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
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
                    <Button className={classes.submit} color={'primary'} type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PersonDialog;
