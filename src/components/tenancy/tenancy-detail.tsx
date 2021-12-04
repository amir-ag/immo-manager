import React from 'react';
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
import { getDisplayNameOfTenancy, TenancyModel } from './model/tenancy.model';
import { dummyProperties } from '../properties/dummy-properties';
import { dummyRentalUnits } from '../rental-unit/dummy-rental-units';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { dummyTenants } from './dummy-tenants';
import { months } from './constants';
import { stylingConstants } from '../../theme/shared-styles';
import { getDisplayNameOfProperty } from '../properties/property/model/property.model';
import { getDisplayNameOfRentalUnit } from '../rental-unit/model/rental-unit.model';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';

export const TenancyDetail = ({ tenancyProps }: { tenancyProps: TenancyModel }) => {
    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfTenancy(tenancyProps)}</Typography>
            <Grid container spacing={stylingConstants.gridSpacing}>
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
                            // TODO: Get data via firestore
                            defaultValue={getDisplayNameOfProperty(dummyProperties[0])}
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
                            // TODO: Get data via firestore
                            defaultValue={getDisplayNameOfRentalUnit(dummyRentalUnits[0])}
                            required
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* TODO: Input needs to be required an the second tenant must not be the same as the first one */}
                        <Autocomplete
                            // TODO: Check if this is the correct way (https://v4.mui.com/customization/components/)
                            className={'MuiFormControl-marginNormal'}
                            id="tenant1"
                            // TODO: Use real data from firebase
                            options={dummyTenants}
                            // TODO: Create shared function for the person display name
                            getOptionLabel={(tenant) =>
                                `${tenant.firstname} ${tenant.lastname}, ${tenant.city}`
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Tenant 1" variant="outlined" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            // TODO: Check if this is the correct way (https://v4.mui.com/customization/components/)
                            className={'MuiFormControl-marginNormal'}
                            id="tenant2"
                            // TODO: Use real data from firebase
                            options={dummyTenants}
                            // TODO: Create shared function for the person display name
                            getOptionLabel={(tenant) =>
                                `${tenant.firstname} ${tenant.lastname}, ${tenant.city}`
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Tenant 2" variant="outlined" />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControlLabel
                            control={<Checkbox name="isFamilyApartment" />}
                            label="Is Family Apartment?"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {/* TODO: Use date picker dialog (https://v4.mui.com/components/pickers/) */}
                        <TextField
                            id="beginOfContract"
                            label="Begin of Contract"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* TODO: Use date picker dialog (https://v4.mui.com/components/pickers/) / min. Date should be higher than 'beginOfContract' */}
                        <TextField
                            id="endOfContract"
                            label="End of Contract"
                            type="date"
                            fullWidth
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
                                value={['March', 'June', 'September']}
                                input={<Input />}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                                {months.map((name, i) => (
                                    <MenuItem key={i} value={i}>
                                        <Checkbox />
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
                    <DetailViewFormActions />
                </Grid>
            </Grid>
        </>
    );
};
