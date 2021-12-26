import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Edit } from '@material-ui/icons';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';
import { PropertyModel } from './model/property.model';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { selectPersonsOwners, selectPersonsServiceProviders } from '../../store/selectors';
import { getPersonDisplayNameForFormSelectFields, PersonModel } from '../persons/models/person.model';
import { stylingConstants } from '../../theme/shared-styles';
import { createOrUpdateProperty } from '../../store/slices/properties.slice';
import { useHistory } from 'react-router';
import routes from '../../routes/route-constants';

export type PropertyFormProps = {
    currentProperty: PropertyModel;
    setCurrentProperty: Dispatch<SetStateAction<PropertyModel>>;
    isNew: boolean;
};

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        width: '75%',
        margin: 'auto',
    },
}));

export const PropertyForm = ({ currentProperty, setCurrentProperty, isNew }: PropertyFormProps) => {
    const cssClasses = useStyles();

    const owners = useAppSelector(selectPersonsOwners);
    const janitors = useAppSelector(selectPersonsServiceProviders);

    const dispatch = useAppDispatch();
    const history = useHistory();

    // TODO: Reuse
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentProperty((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // TODO: Reuse
    const onChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCurrentProperty((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [e.target.id]: e.target.value,
            },
        }));
    };

    // TODO: Reuse
    const handleAutocompleteChange = (event: any, value: PersonModel | null, fieldName: string) => {
        setCurrentProperty((prevState) => ({
            ...prevState,
            [fieldName]: value ? value.id : '',
        }));
    };

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        dispatch(createOrUpdateProperty(currentProperty));
        if (isNew) {
            history.push(routes.PROPERTIES_OVERVIEW);
        }
    };

    const handleCancel = () => {
        history.push(routes.PROPERTIES_OVERVIEW);
    };

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
                {/*
                TODO:
                    - Use same component as in profile view
                    - Connect to Model/Firestore
                */}
                <Card elevation={3} className={cssClasses.thumbnail}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <Edit />
                            </IconButton>
                        }
                        title={<Typography variant={'body1'}>Edit the thumbnail.</Typography>}
                    />
                    <CardMedia
                        component="img"
                        alt="Property Placeholder Image"
                        height="150"
                        loading="lazy"
                        image="https://cdn.pixabay.com/photo/2016/11/21/15/09/apartments-1845884_640.jpg"
                        title="Property Placeholder Image"
                    />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'name'}
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    value={owners.find((o) => o.id === currentProperty.owner)}
                    getOptionSelected={(option: PersonModel, value: PersonModel) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Owner" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    value={currentProperty.yearOfConstruction}
                    onChange={(e) => onChange(e)}
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
                    value={janitors.find((j) => j.id === currentProperty.janitor)}
                    getOptionSelected={(option: PersonModel, value: PersonModel) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="Janitor" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'}>Address</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'addressLine1'}
                    value={currentProperty.address.addressLine1}
                    onChange={(e) => onChangeAddress(e)}
                    label={'Address Line 1'}
                    type="text"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    value={currentProperty.address.addressLine2}
                    onChange={(e) => onChangeAddress(e)}
                    id={'addressLine2'}
                    label={'Address Line 2'}
                    type="text"
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'postCode'}
                    value={currentProperty.address.postCode}
                    onChange={(e) => onChangeAddress(e)}
                    label={'Post Code'}
                    inputProps={{ min: 1000, max: 9999 }}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    variant={'outlined'}
                    value={currentProperty.address.city}
                    onChange={(e) => onChangeAddress(e)}
                    fullWidth
                    id={'city'}
                    label={'City'}
                    type="text"
                    required
                />
            </Grid>
            {/* TODO: Only enable submit button when form has been "touched" */}
            <DetailViewFormActions handleCancel={handleCancel} />
        </Grid>
    );
};
