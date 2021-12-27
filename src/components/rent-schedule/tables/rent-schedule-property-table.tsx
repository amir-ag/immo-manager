import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import { getDisplayNameOfProperty, PropertyModel } from '../../property/model/property.model';

const useStyles = makeStyles((theme) => ({
    propertyDetails: {
        maxWidth: 500,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

const RentSchedulePropertyTable = (property: PropertyModel) => {
    const classes = useStyles();

    return (
        property && (
            <TableContainer className={classes.propertyDetails} component={Paper}>
                <Table size="small">
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
                </Table>
            </TableContainer>
        )
    );
};

export default RentSchedulePropertyTable;
