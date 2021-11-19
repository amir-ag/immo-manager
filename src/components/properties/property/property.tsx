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
import { PropertyModel } from './model/property.model';
import { Edit, Search } from '@material-ui/icons';
import { dummyOwners } from './dummy-owners';
import { dummyJanitors } from './dummy-janitors';
import AddIcon from '@material-ui/icons/Add';
import { dummyRentalUnits } from '../../rental-units/dummy-rental-units';
import { RentalUnitModel } from '../../rental-units/model/rental-unit.model';

const useStyles = makeStyles((theme) => ({
    thumbnail: {
        width: '75%',
        margin: 'auto',
    },
    table: {
        width: '100%',
    },
}));

const gridSpacing = 4;

export const Property = ({ propertyProps }: { propertyProps: PropertyModel }) => {
    const cssClasses = useStyles();

    const getNameOfRentalUnit = (ru: RentalUnitModel) => {
        let resultString = '';

        if (ru.type === 'Apartment' || ru.type === 'Hobby Room') {
            resultString += `${ru.numberOfRooms} Room `;
        }

        resultString += ru.type;

        if (ru.floorLevel && ru.floorLevel !== 'Undefined') {
            resultString += `, ${ru.floorLevel}`;
        }

        return resultString;
    };

    return (
        <>
            <Typography variant={'h5'}>{`${propertyProps.name} (${propertyProps.egid})`}</Typography>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={5}>
                    <Typography variant={'h6'}>General Info</Typography>
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'name'}
                        label={'Name'}
                        required
                    />
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
                            <Autocomplete
                                id="combo-box-demo"
                                // TODO: Use real data from firebase
                                options={dummyOwners}
                                getOptionLabel={(owner) =>
                                    `${owner.firstname} ${owner.lastname}, ${owner.city}`
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Owner" variant="outlined" />
                                )}
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
                            <Autocomplete
                                id="combo-box-demo"
                                // TODO: Use real data from firebase
                                options={dummyJanitors}
                                getOptionLabel={(owner) =>
                                    `${owner.firstname} ${owner.lastname}, ${owner.city}`
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Janitor" variant="outlined" />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant={'h6'}>Address</Typography>

                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'addressLine1'}
                        label={'Address Line 1'}
                        type="text"
                        required
                    />
                    <TextField
                        variant={'outlined'}
                        margin={'normal'}
                        fullWidth
                        id={'addressLine2'}
                        label={'Address Line 2'}
                        type="text"
                    />

                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'postCode'}
                                label={'Post Code'}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'city'}
                                label={'City'}
                                type="text"
                                required
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant={'h6'}>Rental Objects</Typography>
                    <Grid container spacing={gridSpacing} alignItems={'center'}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="textSearch"
                                margin={'normal'}
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
                        <Grid item xs={12} sm={4}>
                            <Button fullWidth variant="contained" color="primary" endIcon={<AddIcon />}>
                                New
                            </Button>
                        </Grid>
                    </Grid>
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
                                        <TableCell>{getNameOfRentalUnit(ru)}</TableCell>
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
        </>
    );
};
