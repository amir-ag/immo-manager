import React from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";

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
    createData('Recep', 'Erdogan', 'Platz 1, 8001 Visp', '079246585', 'Tenant'),
    createData('Laurent', 'Meyer', 'Sonne 4, 8008 Erlenbach', '079265485', 'Tenant'),
    createData('Ismael', 'Peters', 'Hofbach 10, 8008 Entlisau', '079426585', 'Owner'),
    createData('Stefano', 'Hofer', 'Seebach 120, 8008 Dübendorf', '079256585', 'Tenant'),
    createData('Xixhuan', 'Wright', 'Römerhof 444, 8002 Zürich', '079265485', 'Tenant'),
    createData('Tomi', 'Erdogan', 'Rieterstrasse 1, 8001 Uster', '079246585', 'Tenant'),
    createData('Peterli', 'Sohn', 'Stettbacherweg 444, 8002 Zürich', '079265485', 'Tenant'),
    createData('Saanvika', 'Lakshmi', 'Rieterstrasse 1, 8001 Uster', '079246585', 'Tenant'),
];

const ContentTable = () => {

    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                        <TableRow key={index}>
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default ContentTable;
