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
import { PropertyModel } from './model/property.model';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        width: '75%',
        margin: 'auto',
    },
}));

const gridSpacing = 3;

export const Property = ({ propertyProps }: { propertyProps: PropertyModel }) => {
    const cssClasses = useStyles();

    return (
        <>
            <Typography variant={'h5'}>{`${propertyProps.name} (${propertyProps.egid})`}</Typography>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'h6'}>General Info</Typography>
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
                            // TODO: Use local placeholder image
                            image="https://cdn.pixabay.com/photo/2016/11/21/15/09/apartments-1845884_640.jpg"
                            title="Property Placeholder Image"
                        />
                    </Card>

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'egid'}
                                label={'EGID'}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'yearOfConstruction'}
                                label={'Year of Construction'}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Autocomplete
                        id="combo-box-demo"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Combo box" variant="outlined" />
                        )}
                    />
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'name'}
                        label={'Name'}
                        required
                    />

                    <Typography variant={'h6'}>Address</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'h6'}>Rental Objects</Typography>
                </Grid>
            </Grid>
        </>
    );
};
