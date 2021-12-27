import React from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { getDisplayNameOfRentalUnit, RentalUnitModel } from '../../rental-unit/model/rental-unit.model';
import { TenancyModel } from '../../tenancy/model/tenancy.model';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    bold: {
        fontWeight: 'bold',
    },
});

type RentScheduleUnitsTableProps = {
    rentalUnits: RentalUnitModel[];
    getTenant: (unit: RentalUnitModel) => TenancyModel;
    rentSum: number;
};

const RentScheduleUnitsTable = ({ rentalUnits, getTenant, rentSum }: RentScheduleUnitsTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="rent-schedule table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ewid ID</TableCell>
                        <TableCell align="right">Rental Unit</TableCell>
                        <TableCell align="right">Tenant</TableCell>
                        <TableCell align="right">Area</TableCell>
                        <TableCell align="right">Since</TableCell>
                        <TableCell align="right">Until</TableCell>
                        <TableCell align="right">Rent Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rentalUnits.map((unit) => {
                        const tenant = getTenant(unit);
                        return (
                            <TableRow key={unit.ewid}>
                                <TableCell component="th" scope="row">
                                    {unit.ewid}
                                </TableCell>
                                <TableCell align="right">{getDisplayNameOfRentalUnit(unit)}</TableCell>
                                <TableCell align="right">{tenant.id}</TableCell>
                                <TableCell align="right">{unit.surfaceInM2}</TableCell>
                                <TableCell align="right">{tenant.beginOfContract}</TableCell>
                                <TableCell align="right">{tenant.endOfContract}</TableCell>
                                <TableCell align="right">{tenant.rentNet}</TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow>
                        <TableCell className={classes.bold}>Total Liegenschaft</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell className={classes.bold} align={'right'}>
                            {rentSum}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RentScheduleUnitsTable;
