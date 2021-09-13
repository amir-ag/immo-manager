import React from 'react';
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(firstName: string, lastName: string, address: string, phone: string, role: string) {
    return {firstName, lastName, address, phone, role};
}

const rows = [
    createData('Peter', 'Meyer', 'Rigiweg 4, 8008 Zürich', '079265485', 'Tenant'),
    createData('Lara', 'Peters', 'Kappelle 10, 8008 Zürich', '079426585', 'Owner'),
    createData('Kris', 'Hofer', 'Seefeldstrasse 120, 8008 Zürich', '079256585', 'Tenant'),
    createData('Jason', 'Wright', 'Quai 444, 8002 Zürich', '079265485', 'Tenant'),
    createData('Recep', 'Erdogan', 'Bellevue 1, 8001 Zürich', '079246585', 'Tenant'),
];


const ContentTable = () => {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label={"people table"}>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align={"right"}>Last Name</TableCell>
                        <TableCell align={"right"}>Address</TableCell>
                        <TableCell align={"right"}>Phone</TableCell>
                        <TableCell align={"right"}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.firstName}>
                            <TableCell component={"th"} scope={"row"}>
                                {row.firstName}
                            </TableCell>
                            <TableCell align={"right"}>{row.lastName}</TableCell>
                            <TableCell align={"right"}>{row.address}</TableCell>
                            <TableCell align={"right"}>{row.phone}</TableCell>
                            <TableCell align={"right"}>{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContentTable;
