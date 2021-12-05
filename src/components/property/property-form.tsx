import React from 'react';
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
import { dummyOwners } from './dummy-owners';
import { dummyJanitors } from './dummy-janitors';
import DetailViewFormActions from '../ui/detail-view-form-actions/detail-view-form-actions';

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        width: '75%',
        margin: 'auto',
    },
    table: {
        width: '100%',
    },
}));

export const PropertyForm = () => {
    const cssClasses = useStyles();

    return (
        <>
            <Grid item xs={12}>
                <Typography variant={'h6'}>General Info</Typography>
            </Grid>
            <Grid item xs={12}>
                {/* TODO: Use same component as in profile view */}
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
                    label={'Name'}
                    inputProps={{ maxLength: 30 }}
                    required
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField variant={'outlined'} fullWidth id={'egid'} label={'EGID'} type="number" required />
            </Grid>
            <Grid item xs={12} md={6}>
                <Autocomplete
                    id="owner"
                    // TODO: Use real data from firebase
                    options={dummyOwners}
                    getOptionLabel={(owner) => `${owner.firstname} ${owner.lastname}, ${owner.city}`}
                    renderInput={(params) => <TextField {...params} label="Owner" variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    variant={'outlined'}
                    fullWidth
                    id={'yearOfConstruction'}
                    label={'Year of Construction'}
                    type="number"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Autocomplete
                    id="janitor"
                    // TODO: Use real data from firebase
                    options={dummyJanitors}
                    getOptionLabel={(owner) => `${owner.firstname} ${owner.lastname}, ${owner.city}`}
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
                    label={'Address Line 1'}
                    type="text"
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant={'outlined'}
                    fullWidth
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
                    label={'Post Code'}
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField variant={'outlined'} fullWidth id={'city'} label={'City'} type="text" required />
            </Grid>
            <DetailViewFormActions />
        </>
    );
};
