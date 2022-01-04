import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { PropertyModel } from './model/property.model';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { selectPersonsJanitors, selectPersonsOwners } from '../../store/selectors';
import {
    emptyPerson,
    getPersonDisplayNameForFormSelectFields,
    PersonModel,
} from '../person/model/person.model';
import { stylingConstants } from '../../theme/shared-styles';
import { createOrUpdateProperty } from '../../store/slices/properties.slice';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { useForms } from '../../hooks/forms.hooks';
import ImageUpload from '../forms/image-upload/image-upload';
import AddressFormFields from '../forms/address-form-fields/address-form-fields';

export type PropertyFormProps = {
    currentProperty: PropertyModel;
    setCurrentProperty: Dispatch<SetStateAction<PropertyModel>>;
    isNew: boolean;
};

export const PropertyForm = ({ currentProperty, setCurrentProperty, isNew }: PropertyFormProps) => {
    const owners = useAppSelector(selectPersonsOwners);
    const janitors = useAppSelector(selectPersonsJanitors);

    const dispatch = useAppDispatch();
    const history = useHistory();

    const submitFunc = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(createOrUpdateProperty(currentProperty));
        if (isNew) {
            history.push(routes.PROPERTIES_OVERVIEW);
        }
    };

    const handleCancel = () => {
        history.push(routes.PROPERTIES_OVERVIEW);
    };

    const {
        handleBasicInputChange,
        handleAddressInputChange,
        handleAutocompleteChange,
        handleThumbnailChange,
        handleSubmit,
        isFormDirty,
    } = useForms<PropertyModel>(setCurrentProperty, currentProperty, submitFunc);

    return (
        <Grid
            item
            container
            xs={12}
            sm={6}
            spacing={stylingConstants.gridSpacing}
            alignItems={'center'}
            alignContent={'flex-start'}
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
        >
            <Grid item xs={12}>
                <Typography variant={'h6'}>General Info</Typography>
            </Grid>
            <Grid item xs={12}>
                <ImageUpload
                    handleImageChange={handleThumbnailChange}
                    previewImageUrl={currentProperty.thumbnail?.imageUrl}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'name'}
                    onChange={(e) => handleBasicInputChange(e)}
                    value={currentProperty.name}
                    label={'Name'}
                    inputProps={{ maxLength: 30 }}
                    required
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    value={currentProperty.egid}
                    fullWidth
                    onChange={(e) => handleBasicInputChange(e)}
                    id={'egid'}
                    label={'EGID'}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} md={6}>
                {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                <Autocomplete
                    id="owner"
                    options={owners}
                    onChange={(e, v) => handleAutocompleteChange(e, v, 'owner')}
                    getOptionLabel={getPersonDisplayNameForFormSelectFields}
                    value={owners.find((o) => o.id === currentProperty.owner) ?? emptyPerson}
                    getOptionSelected={(option: PersonModel, value: PersonModel) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Owner" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    value={currentProperty.yearOfConstruction}
                    onChange={(e) => handleBasicInputChange(e)}
                    id={'yearOfConstruction'}
                    label={'Year of Construction'}
                    type="number"
                    inputProps={{ min: 0 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                <Autocomplete
                    id="janitor"
                    options={janitors}
                    onChange={(e, v) => handleAutocompleteChange(e, v, 'janitor')}
                    getOptionLabel={getPersonDisplayNameForFormSelectFields}
                    value={janitors.find((j) => j.id === currentProperty.janitor) ?? emptyPerson}
                    getOptionSelected={(option: PersonModel, value: PersonModel) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Janitor" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'}>Address</Typography>
            </Grid>
            <AddressFormFields
                addressState={currentProperty.address}
                handleAddressInputChange={handleAddressInputChange}
            />
            {/* TODO: Only enable submit button when form has been "touched" */}
            <FormSubmitBar disableSubmit={!isFormDirty} handleCancel={handleCancel} />
        </Grid>
    );
};
