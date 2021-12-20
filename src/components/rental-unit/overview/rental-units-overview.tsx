import React, { useEffect } from 'react';
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
import { getDisplayNameOfRentalUnit } from '../model/rental-unit.model';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentProperty, selectRentalUnits } from '../../../store/selectors';
import { getRentalUnits } from '../../../store/slices/rental-units.slice';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
}));

export const RentalUnitsOverview = ({ disableCreate }: { disableCreate: boolean }) => {
    const cssClasses = useStyles();

    const dispatch = useAppDispatch();
    const property = useAppSelector(selectCurrentProperty);
    const rentalUnits = useAppSelector(selectRentalUnits)?.filter((ru) => ru.propertyId === property?.id);

    useEffect(() => {
        dispatch(getRentalUnits());
    }, [dispatch]);

    return (
        <>
            {/* TODO: Check if it makes sense to extract search header (input + button) as component */}
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
                <Button
                    component={Link}
                    to={routes.RENTAL_UNITS_CREATE}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    disabled={disableCreate}
                >
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
                            {rentalUnits?.map((ru) => (
                                <TableRow key={ru.id}>
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
