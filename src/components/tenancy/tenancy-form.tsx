import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { months } from '../../constants';
import { gridSpacingBig } from '../../theme/shared-styles';
import { PropertyModel } from '../property/model/property.model';
import { RentalUnitModel } from '../rental-unit/model/rental-unit.model';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { TenancyModel } from './model/tenancy.model';
import { emptyPerson, PersonModel } from '../person/model/person.model';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { createOrUpdateTenancy } from '../../store/slices/tenancies.slice';
import { useForms } from '../../hooks/use-forms.hook';
import * as personService from '../person/service/person.service';
import * as propertyService from '../property/service/property.service';
import * as rentalUnitService from '../rental-unit/service/rental-unit.service';
import { getItemFromCollectionById } from '../../services/collection-utils.service';

export type TenancyFormProps = {
    currentTenancy: TenancyModel;
    setCurrentTenancy: Dispatch<SetStateAction<TenancyModel>>;
    property: PropertyModel;
    rentalUnit: RentalUnitModel;
    tenants: PersonModel[];
    isNew: boolean;
};

export const TenancyForm = ({
    currentTenancy,
    setCurrentTenancy,
    property,
    rentalUnit,
    tenants,
    isNew,
}: TenancyFormProps) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const submitFunc = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(createOrUpdateTenancy(currentTenancy));
        if (isNew) {
            history.push(routes.getRentalUnitDetailRouteById(rentalUnit.id));
        }
    };

    const handleCancel = () => {
        history.push(routes.getRentalUnitDetailRouteById(rentalUnit.id));
    };

    const { handleBasicInputChange, handleAutocompleteChange, handleSubmit, isFormDirty } =
        useForms<TenancyModel>(setCurrentTenancy, currentTenancy, submitFunc);

    // TODO: Reuse Grid (Containers) as custom component
    return (
        <Grid
            component={'form'}
            onSubmit={(e: React.FormEvent<HTMLElement>) => handleSubmit(e)}
            container
            spacing={gridSpacingBig}
        >
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={gridSpacingBig}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component={'h3'}>
                        Basic Info
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'property'}
                        label={'Property'}
                        type="text"
                        defaultValue={propertyService.getDisplayNameOfProperty(property)}
                        required
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentalUnit'}
                        label={'Rental Unit'}
                        type="text"
                        defaultValue={rentalUnitService.getDisplayNameOfRentalUnit(rentalUnit)}
                        required
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                    <Autocomplete
                        className={'MuiFormControl-marginNormal'}
                        id="tenant1Id"
                        options={tenants}
                        onChange={(e, v) => handleAutocompleteChange(v, 'tenant1Id')}
                        getOptionLabel={personService.getPersonDisplayNameForFormSelectFields}
                        value={
                            getItemFromCollectionById(currentTenancy?.tenant1Id ?? '', tenants) ?? emptyPerson
                        }
                        getOptionSelected={(option: PersonModel, value: PersonModel) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tenant 1"
                                variant="outlined"
                                required={!currentTenancy.isVacancy}
                            />
                        )}
                        disabled={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                    <Autocomplete
                        className={'MuiFormControl-marginNormal'}
                        id="tenant2Id"
                        options={tenants}
                        onChange={(e, v) => handleAutocompleteChange(v, 'tenant2Id')}
                        getOptionLabel={personService.getPersonDisplayNameForFormSelectFields}
                        value={
                            getItemFromCollectionById(currentTenancy?.tenant2Id ?? '', tenants) ?? emptyPerson
                        }
                        getOptionSelected={(option: PersonModel, value: PersonModel) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tenant 2" variant="outlined" />
                        )}
                        disabled={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component={'h3'}>
                        Contract Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        id="isVacancy"
                        onChange={(e) => {
                            setCurrentTenancy({
                                ...currentTenancy,
                                tenant1Id: '',
                                tenant2Id: '',
                            });
                            handleBasicInputChange(e, 'isVacancy', true);
                        }}
                        control={<Checkbox name="isFamilyApartment" />}
                        label="Is Vacancy"
                        checked={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        id="isFamilyApartment"
                        onChange={(e) => handleBasicInputChange(e, 'isFamilyApartment', true)}
                        control={<Checkbox name="isFamilyApartment" />}
                        label="Is Family Apartment?"
                        checked={currentTenancy.isFamilyApartment}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="beginOfContract"
                        label="Begin of Contract"
                        type="date"
                        fullWidth
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.beginOfContract}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="endOfContract"
                        label="End of Contract"
                        type="date"
                        fullWidth
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.endOfContract}
                        inputProps={{ min: currentTenancy.beginOfContract }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'cancellationPeriod'}
                        label={'Cancellation Period (Months)'}
                        type="number"
                        defaultValue={3}
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.cancellationPeriod}
                        inputProps={{ min: 0, max: 12 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="cancellationMonthsLabel">Cancellation Months</InputLabel>
                        <Select
                            labelId="cancellationMonthsLabel"
                            id="cancellationMonths"
                            multiple
                            value={currentTenancy.cancellationMonths ?? []}
                            onChange={(e) => handleBasicInputChange(e, 'cancellationMonths')}
                            input={<Input />}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {months.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={currentTenancy.cancellationMonths.includes(name)} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={gridSpacingBig}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} component={'h3'}>
                        Rent Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentNet'}
                        label={'Rent Net (CHF)'}
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.rentNet === 0 ? '' : currentTenancy.rentNet}
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'utilities'}
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.utilities === 0 ? '' : currentTenancy.utilities}
                        label={'Utilities (CHF)'}
                        type="number"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentDeposit'}
                        onChange={(e) => handleBasicInputChange(e)}
                        value={currentTenancy.rentDeposit === 0 ? '' : currentTenancy.rentDeposit}
                        label={'Rent Deposit (CHF)'}
                        type="number"
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentAccount'}
                        value={currentTenancy.rentAccount}
                        onChange={(e) => handleBasicInputChange(e)}
                        label={'Rent Account (IBAN)'}
                        helperText={'Provide a valid IBAN'}
                        inputProps={{ minLength: 19 }}
                        type="text"
                        required
                    />
                </Grid>
            </Grid>
            <FormSubmitBar
                disableSubmit={!isFormDirty}
                handleCancel={() => handleCancel()}
                submitButtonText={isNew ? 'Create' : 'Update'}
            />
        </Grid>
    );
};
