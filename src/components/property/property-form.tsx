import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormSubmitBar from '../forms/form-submit-bar/form-submit-bar';
import { PropertyModel } from './model/property.model';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { selectJanitors, selectOwners } from '../../store/selectors';
import { emptyPerson, PersonModel } from '../person/model/person.model';
import { gridSpacingBig } from '../../theme/shared-styles';
import { createOrUpdateProperty } from '../../store/slices/properties.slice';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';
import { useForms } from '../../hooks/use-forms.hook';
import ImageUpload from '../forms/image-upload/image-upload';
import AddressFormFields from '../forms/address-form-fields/address-form-fields';
import * as personService from '../person/service/person.service';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import * as collectionUtils from '../../services/collection-utils';

export type PropertyFormProps = {
    currentProperty: PropertyModel;
    setCurrentProperty: Dispatch<SetStateAction<PropertyModel>>;
    isNew: boolean;
};

export const PropertyForm = ({ currentProperty, setCurrentProperty, isNew }: PropertyFormProps) => {
    const owners = useAppSelector(selectOwners);
    const janitors = useAppSelector(selectJanitors);

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
            spacing={gridSpacingBig}
            alignItems={'center'}
            alignContent={'flex-start'}
            component={'form'}
            onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
        >
            <Grid item xs={12}>
                <ImageUpload
                    handleImageChange={handleThumbnailChange}
                    previewImageUrl={currentProperty.thumbnail?.imageUrl}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'subtitle2'} component={'h3'}>
                    Basic Info
                </Typography>
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
                    getOptionLabel={personService.getPersonDisplayNameForFormSelectFields}
                    value={
                        collectionUtils.getItemFromCollectionById(currentProperty.owner, owners) ??
                        emptyPerson
                    }
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
                    inputProps={{ min: 0, max: new Date().getFullYear() + 10 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                {/* TODO: Resolve console error about change (controlled vs. uncontrolled) */}
                <Autocomplete
                    id="janitor"
                    options={janitors}
                    onChange={(e, v) => handleAutocompleteChange(e, v, 'janitor')}
                    getOptionLabel={personService.getPersonDisplayNameForFormSelectFields}
                    value={
                        collectionUtils.getItemFromCollectionById(currentProperty.janitor, janitors) ??
                        emptyPerson
                    }
                    getOptionSelected={(option: PersonModel, value: PersonModel) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Janitor" variant="outlined" />}
                />
            </Grid>
            <AddressFormFields
                addressState={currentProperty.address}
                handleAddressInputChange={handleAddressInputChange}
            />
            <FormSubmitBar
                disableSubmit={!isFormDirty}
                handleCancel={handleCancel}
                submitButtonText={isNew ? 'Create' : 'Update'}
            />
        </Grid>
    );
};
