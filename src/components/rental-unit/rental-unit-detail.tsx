import React from 'react';
import {
    Button,
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
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
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { rentalUnitfloorLevel, RentalUnitModel, rentalUnitType } from './model/rental-unit.model';
import { dummyTenancies } from '../tenancy/dummy-tenancies';
import { format } from 'date-fns';

export const getDisplayNameOfRentalUnit = (ru: RentalUnitModel) => {
    let resultString = '';

    if (ru.type === 'Apartment' || ru.type === 'Hobby Room') {
        resultString += `${ru.numberOfRooms} Room `;
    }

    resultString += ru.type;

    if (ru.floorLevel && ru.floorLevel !== 'Undefined') {
        resultString += `, ${ru.floorLevel}`;
    }

    return resultString + ` (${ru.ewid})`;
};

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

export const RentalUnitDetail = ({ rentalUnitProps }: { rentalUnitProps: RentalUnitModel }) => {
    const cssClasses = useStyles();

    return (
        <>
            <Typography variant={'h5'}>{getDisplayNameOfRentalUnit(rentalUnitProps)}</Typography>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={5}>
                    <Typography variant={'h6'}>General Info</Typography>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'ewid'}
                                label={'EWID'}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={'type'}
                                select
                                label="Select"
                                margin={'normal'}
                                helperText="Select a room type"
                                variant="outlined"
                                fullWidth
                            >
                                {rentalUnitType.map((rut, i) => (
                                    <MenuItem value={i}>{rut}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'numberOfRooms'}
                                label={'Number of Rooms'}
                                type="number"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant={'outlined'}
                                margin={'normal'}
                                fullWidth
                                id={'surfaceInM2'}
                                label={'Surface in m2'}
                                type="number"
                            />
                        </Grid>
                    </Grid>

                    {/* TODO: Check if it's possible to use an 'Autocomplete' component */}
                    <TextField
                        id={'floorLevel'}
                        select
                        label="Select"
                        helperText="Select a floor level"
                        variant="outlined"
                        margin={'normal'}
                        fullWidth
                    >
                        {rentalUnitfloorLevel.map((rufl, i) => (
                            <MenuItem value={i}>{rufl}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Typography variant={'h6'}>Tenancies</Typography>
                    <Grid container spacing={gridSpacing} alignItems={'center'}>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="textSearch"
                                margin={'normal'}
                                variant="outlined"
                                fullWidth
                                label="Search for Person"
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
                                    <TableCell>Tenant(s)</TableCell>
                                    <TableCell align="right">From</TableCell>
                                    <TableCell align="right">To</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dummyTenancies.map((t) => (
                                    <TableRow key={t.tenant}>
                                        <TableCell>{t.tenant}</TableCell>
                                        {/* TODO: Use data from firestore */}
                                        <TableCell align="right">
                                            {t.beginOfContract
                                                ? format(t.beginOfContract, 'dd.MM.yyyy')
                                                : '-'}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t.endOfContract ? format(t.endOfContract, 'dd.MM.yyyy') : '-'}
                                        </TableCell>
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
