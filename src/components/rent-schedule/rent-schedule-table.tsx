import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectProperties, selectRentalUnits, selectTenancies } from '../../store/selectors';
import {
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { getDisplayNameOfRentalUnit, RentalUnitModel } from '../rental-unit/model/rental-unit.model';
import { emptyTenancy } from '../tenancy/model/tenancy.model';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
import { getDisplayNameOfProperty } from '../property/model/property.model';

const useStyles = makeStyles((theme) => ({
    exportContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    title: {
        marginTop: theme.spacing(5),
    },
    table: {
        minWidth: 650,
    },
    bold: {
        fontWeight: 'bold',
    },
    content: {},
    propertyDetails: {
        maxWidth: '40%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

const RentScheduleTable = () => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const classes = useStyles();

    const { id } = useParams<{ id: string }>();

    const property = useAppSelector(selectProperties).filter((property) => property.id === id)[0];
    const rentalUnits = useAppSelector(selectRentalUnits).filter((unit) => unit.propertyId === id);
    const tenancies = useAppSelector(selectTenancies).filter(
        (tenant) => tenant.rentalUnitId === rentalUnits[0].id
    );

    let rentSum = 0;

    const getTenant = (unit: RentalUnitModel) => {
        const tenant = tenancies.filter((tenant) => tenant.rentalUnitId === unit.id)[0] || emptyTenancy;
        rentSum += tenant.rentNet;
        return tenant;
    };

    return (
        <>
            <div className={classes.exportContainer}>
                <Typography variant={'h6'}>Export as PDF</Typography>
                <IconButton onClick={handlePrint}>
                    <GetAppOutlinedIcon />
                </IconButton>
            </div>
            <div className={classes.content} ref={componentRef}>
                <Typography className={classes.title} variant={'h5'}>
                    Rent Schedule Report for {getDisplayNameOfProperty(property)}
                </Typography>
                <TableContainer className={classes.propertyDetails} component={Paper}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Report created on</TableCell>
                            <TableCell>{format(new Date(), 'do MMMM Y')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Property ID</TableCell>
                            <TableCell>{property.egid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>{getDisplayNameOfProperty(property)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{`${property.address.addressLine1}, ${property.address.postCode} ${property.address.city}`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Owner</TableCell>
                            <TableCell>{property.owner}</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
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
                                        <TableCell align="right">
                                            {getDisplayNameOfRentalUnit(unit)}
                                        </TableCell>
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
            </div>
        </>
    );
};

export default RentScheduleTable;
