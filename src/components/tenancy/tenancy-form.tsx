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
import { stylingConstants } from '../../theme/shared-styles';
import { getDisplayNameOfProperty, PropertyModel } from '../property/model/property.model';
import { getDisplayNameOfRentalUnit, RentalUnitModel } from '../rental-unit/model/rental-unit.model';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';
import { TenancyModel } from './model/tenancy.model';
import { getPersonDisplayNameForFormSelectFields, PersonModel } from '../persons/models/person.model';
import { useAppDispatch } from '../../store/hooks';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { createOrUpdateTenancy } from '../../store/slices/tenancy.slice';

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

    // TODO: Reuse
    const handleAutocompleteChange = (event: any, value: PersonModel | null, fieldName: string) => {
        setCurrentTenancy((prevState) => ({
            ...prevState,
            [fieldName]: value ? value.id : '',
        }));
    };

    // TODO: Reuse
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentTenancy((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // TODO: Reuse
    const onChangeCheckbox = (e: React.ChangeEvent<any>, fieldName: string) => {
        setCurrentTenancy((prevState) => ({
            ...prevState,
            [fieldName]: e.target.checked,
        }));
    };

    // TODO: Reuse
    const onChangeSelect = (e: React.ChangeEvent<any>, fieldName: string) => {
        setCurrentTenancy((prevState) => ({
            ...prevState,
            [fieldName]: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(createOrUpdateTenancy(currentTenancy));
        if (isNew) {
            history.push(routes.getRentalUnitDetailRouteById(rentalUnit.id));
        }
    };

    const handleCancel = () => {
        history.push(routes.getRentalUnitDetailRouteById(rentalUnit.id));
    };

    return (
        <Grid
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
            container
            spacing={stylingConstants.gridSpacing}
        >
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'h6'}>General Info</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'property'}
                        label={'Property'}
                        type="text"
                        defaultValue={getDisplayNameOfProperty(property)}
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
                        defaultValue={getDisplayNameOfRentalUnit(rentalUnit)}
                        required
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* TODO: Input needs to be required an the second tenant must not be the same as the first one */}
                    {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                    <Autocomplete
                        // TODO: Check if this styling is the correct way (https://v4.mui.com/customization/components/)
                        className={'MuiFormControl-marginNormal'}
                        id="tenant1"
                        options={tenants}
                        onChange={(e, v) => handleAutocompleteChange(e, v, 'tenant1')}
                        getOptionLabel={getPersonDisplayNameForFormSelectFields}
                        value={tenants.find((t) => t.id === currentTenancy.tenant1Id)}
                        getOptionSelected={(option: PersonModel, value: PersonModel) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tenant 1" variant="outlined" />
                        )}
                        disabled={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* TODO: Input needs to be required an the second tenant must not be the same as the first one */}
                    {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                    <Autocomplete
                        // TODO: Check if this styling is the correct way (https://v4.mui.com/customization/components/)
                        className={'MuiFormControl-marginNormal'}
                        id="tenant2"
                        options={tenants}
                        onChange={(e, v) => handleAutocompleteChange(e, v, 'tenant2')}
                        getOptionLabel={getPersonDisplayNameForFormSelectFields}
                        value={tenants.find((t) => t.id === currentTenancy.tenant2Id)}
                        getOptionSelected={(option: PersonModel, value: PersonModel) =>
                            option.id === value.id
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Tenant 2" variant="outlined" />
                        )}
                        disabled={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        id="isVacancy"
                        onChange={(e) => {
                            currentTenancy.tenant1Id = '';
                            currentTenancy.tenant2Id = '';
                            onChangeCheckbox(e, 'isVacancy');
                        }}
                        control={<Checkbox name="isFamilyApartment" />}
                        label="Is Vacancy"
                        checked={currentTenancy.isVacancy}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        id="isFamilyApartment"
                        onChange={(e) => onChangeCheckbox(e, 'isFamilyApartment')}
                        control={<Checkbox name="isFamilyApartment" />}
                        label="Is Family Apartment?"
                        checked={currentTenancy.isFamilyApartment}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* TODO: Fix timezone issue! */}
                    {/* TODO: Use date picker dialog (https://v4.mui.com/components/pickers/) */}
                    <TextField
                        id="beginOfContract"
                        label="Begin of Contract"
                        type="date"
                        fullWidth
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.beginOfContract}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* TODO: Fix timezone issue! */}
                    {/* TODO: Use date picker dialog (https://v4.mui.com/components/pickers/) / min. Date should be higher than 'beginOfContract' */}
                    <TextField
                        id="endOfContract"
                        label="End of Contract"
                        type="date"
                        fullWidth
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.endOfContract}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'cancellationPeriod'}
                        label={'Cancellation Period (Months)'}
                        type="number"
                        defaultValue={3}
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.cancellationPeriod}
                        inputProps={{ min: 0, max: 12 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="cancellationMonthsLabel">Cancellation Months</InputLabel>
                        {/* TODO: Use local state for select state */}
                        <Select
                            labelId="cancellationMonthsLabel"
                            id="cancellationMonths"
                            multiple
                            value={currentTenancy.cancellationMonths}
                            onChange={(e) => onChangeSelect(e, 'cancellationMonths')}
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
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <Grid item xs={12}>
                    <Typography variant={'h6'}>Rent Info</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentNet'}
                        label={'Rent Net (CHF)'}
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.rentNet}
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
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.utilities}
                        label={'Utilities (CHF)'}
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentDeposit'}
                        onChange={(e) => onChange(e)}
                        value={currentTenancy.rentDeposit}
                        label={'Rent Deposit (CHF)'}
                        type="number"
                        inputProps={{ min: 0 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        variant={'outlined'}
                        fullWidth
                        id={'rentAccount'}
                        value={currentTenancy.rentAccount}
                        onChange={(e) => onChange(e)}
                        label={'Rent Account (IBAN)'}
                        type="text"
                        required
                    />
                </Grid>
            </Grid>
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            />
            <Grid
                item
                container
                xs={12}
                sm={6}
                spacing={stylingConstants.gridSpacing}
                alignItems={'center'}
                alignContent={'flex-start'}
            >
                <DetailViewFormActions handleCancel={() => handleCancel()} />
            </Grid>
        </Grid>
    );
};
