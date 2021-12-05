import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDisplayNameOfProperty, PropertyModel } from './model/property.model';
import { Edit, Search } from '@material-ui/icons';
import { dummyOwners } from './dummy-owners';
import { dummyJanitors } from './dummy-janitors';
import AddIcon from '@material-ui/icons/Add';
import { dummyRentalUnits } from '../../rental-unit/dummy-rental-units';
import { stylingConstants } from '../../../theme/shared-styles';
import { getDisplayNameOfRentalUnit } from '../../rental-unit/model/rental-unit.model';
import DetailViewFormActions from '../../ui/detail-view-form-actions/detail-view-form-actions';

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        width: '75%',
        margin: 'auto',
    },
    table: {
        width: '100%',
    },
}));

export const Property = ({ propertyProps }: { propertyProps: PropertyModel }) => {
    const cssClasses = useStyles();

    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfProperty(propertyProps)}</Typography>
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
                        <TextField
                            variant={'outlined'}
                            fullWidth
                            id={'egid'}
                            label={'EGID'}
                            type="number"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            id="owner"
                            // TODO: Use real data from firebase
                            options={dummyOwners}
                            getOptionLabel={(owner) => `${owner.firstname} ${owner.lastname}, ${owner.city}`}
                            renderInput={(params) => (
                                <TextField {...params} label="Owner" variant="outlined" />
                            )}
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
                            renderInput={(params) => (
                                <TextField {...params} label="Janitor" variant="outlined" />
                            )}
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
                        <TextField
                            variant={'outlined'}
                            fullWidth
                            id={'city'}
                            label={'City'}
                            type="text"
                            required
                        />
                    </Grid>
                    <DetailViewFormActions />
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
                        <Typography variant={'h6'}>Rental Units</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            id="textSearch"
                            variant="outlined"
                            fullWidth
                            label="Search for Name"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button fullWidth variant="contained" color="secondary" startIcon={<AddIcon />}>
                            New
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={cssClasses.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Current Tenant</TableCell>
                                        <TableCell align="right">Contract Until</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dummyRentalUnits.map((ru) => (
                                        <TableRow key={ru.ewid}>
                                            <TableCell>{getDisplayNameOfRentalUnit(ru)}</TableCell>
                                            {/* TODO: Use data from firestore */}
                                            <TableCell align="right">Hansli Müller</TableCell>
                                            <TableCell align="right">01.01.2022</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
