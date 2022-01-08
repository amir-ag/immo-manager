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
import { RentalUnitModel } from '../../rental-unit/model/rental-unit.model';
import { TenancyModel } from '../../tenancy/model/tenancy.model';
import { format, parseISO } from 'date-fns';
import { PersonModel } from '../../person/model/person.model';
import * as rentalUnitService from '../../rental-unit/service/rental-unit.service';
import * as tenancyService from '../../tenancy/service/tenancy.service';
import * as constants from '../../../constants';

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
    getTenancy: (unit: RentalUnitModel) => TenancyModel;
    tenants: PersonModel[];
};

const RentScheduleUnitsTable = ({ rentalUnits, getTenancy, tenants }: RentScheduleUnitsTableProps) => {
    const classes = useStyles();

    let totalRentSum = 0;

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
                        const tenancy = getTenancy(unit);
                        totalRentSum += Number(tenancy.rentNet);
                        return (
                            <TableRow key={unit.ewid}>
                                <TableCell component="th" scope="row">
                                    {unit.ewid}
                                </TableCell>
                                <TableCell align="right">
                                    {rentalUnitService.getDisplayNameOfRentalUnit(unit)}
                                </TableCell>
                                <TableCell align="right">
                                    {tenancyService.getDisplayNameOfTenants(tenancy, tenants)}
                                </TableCell>
                                <TableCell align="right">{unit.surfaceInM2}</TableCell>
                                <TableCell align="right">
                                    {tenancy.beginOfContract
                                        ? format(parseISO(tenancy.beginOfContract), constants.dateFormatShort)
                                        : '-'}
                                </TableCell>
                                <TableCell align="right">
                                    {tenancy.endOfContract ? tenancy.endOfContract : '-'}
                                </TableCell>
                                <TableCell align="right">{tenancy.rentNet}</TableCell>
                            </TableRow>
                        );
                    })}
                    <TableRow>
                        <TableCell className={classes.bold}>Total Property</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell className={classes.bold} align={'right'}>
                            {totalRentSum}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RentScheduleUnitsTable;
