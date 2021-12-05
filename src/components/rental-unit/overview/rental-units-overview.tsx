import React from 'react';
import {
    Button,
    Grid,
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
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { dummyRentalUnits } from '../dummy-rental-units';
import { getDisplayNameOfRentalUnit } from '../model/rental-unit.model';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
}));

export const RentalUnitsOverview = () => {
    const cssClasses = useStyles();

    return (
        <>
            {/* TODO: Check if it makes sense to extract search header (input + button) */}
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
                {/* TODO: Check if it makes sense to extract table as component */}
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
        </>
    );
};
