import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    AppBar,
    Box,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
    useTheme,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';

import { emptyPerson, PersonModel, personRoles } from './model/person.model';
import { useForms } from '../../hooks/use-forms.hook';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { createUpdatePerson } from '../../store/slices/persons.slice';
import { gridSpacing } from '../../theme/shared-styles';
import AddressFormFields from '../forms/address-form-fields/address-form-fields';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';

export type PersonDialogProps = {
    openDialog: boolean;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
    currentPerson: PersonModel;
    setCurrentPerson: Dispatch<SetStateAction<PersonModel>>;
};

const useStyles = makeStyles({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
});

const PersonDialog = ({ openDialog, setOpenDialog, currentPerson, setCurrentPerson }: PersonDialogProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    const submitFunc = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(createUpdatePerson(currentPerson));
        setCurrentPerson(emptyPerson);
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const { handleBasicInputChange, handleAddressInputChange, handleSubmit, isFormDirty } =
        useForms<PersonModel>(setCurrentPerson, currentPerson, submitFunc);

    return (
        <Dialog
            fullScreen={isDownXs}
            maxWidth={'md'}
            open={openDialog}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    setOpenDialog(false);
                }
            }}
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
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant={'subtitle2'} component={'h3'}>
                                Basic Info
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={currentPerson.company}
                                onChange={(e) => handleBasicInputChange(e)}
                                variant={'outlined'}
                                fullWidth
                                id={'company'}
                                label={'Company (optional)'}
                                name={'company'}
                                autoComplete={'company'}
                                autoFocus
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="roles">Roles</InputLabel>
                                <Select
                                    labelId="roles"
                                    id="roles"
                                    multiple
                                    value={currentPerson.roles ?? []}
                                    onChange={(e) => handleBasicInputChange(e, 'roles')}
                                    input={<Input />}
                                    renderValue={(selected) => (selected as string[]).join(', ')}
                                >
                                    {personRoles.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={currentPerson.roles?.includes(name)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={currentPerson.firstName}
                                onChange={(e) => handleBasicInputChange(e)}
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
                                onChange={(e) => handleBasicInputChange(e)}
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
                                id="birthday"
                                label="Birthday"
                                type="date"
                                fullWidth
                                onChange={(e) => handleBasicInputChange(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <AddressFormFields
                            addressState={currentPerson.address}
                            handleAddressInputChange={handleAddressInputChange}
                        />
                        <Grid item xs={12}>
                            <Typography variant={'subtitle2'} component={'h3'}>
                                Communications
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={currentPerson.email}
                                onChange={(e) => handleBasicInputChange(e)}
                                variant={'outlined'}
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
                                onChange={(e) => handleBasicInputChange(e)}
                                variant={'outlined'}
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
                                onChange={(e) => handleBasicInputChange(e)}
                                variant={'outlined'}
                                fullWidth
                                id={'landline'}
                                label={'Landline'}
                                name={'landline'}
                                autoComplete={'landline'}
                                type={'number'}
                            />
                        </Grid>
                    </Grid>
                    <FormSubmitBar
                        disableSubmit={!isFormDirty}
                        handleCancel={handleCancel}
                        submitButtonText={currentPerson.id ? `Update` : 'Create'}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PersonDialog;
