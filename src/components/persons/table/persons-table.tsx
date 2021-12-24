import React from 'react';
import {
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { PersonModel } from '../models/person.model';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    buttonIcons: {
        display: 'flex',
    },
    address: {
        whiteSpace: 'nowrap',
    },
});

type ContentTableProps = {
    personsData: PersonModel[];
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
};

const PersonsTable = ({ personsData, handleDelete, handleEdit }: ContentTableProps) => {
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
            <Table className={classes.table} aria-label={'people table'}>
                <TableHead>
                    <TableRow>
                        <TableCell>Actions</TableCell>
                        <TableCell align={'right'}>First Name</TableCell>
                        <TableCell align={'right'}>Last Name</TableCell>
                        <TableCell align={'right'}>Address</TableCell>
                        <TableCell align={'right'}>Email</TableCell>
                        <TableCell align={'right'}>Mobile Phone</TableCell>
                        <TableCell align={'right'}>Phone</TableCell>
                        <TableCell align={'right'}>Birthday</TableCell>
                        <TableCell align={'right'}>Role</TableCell>
                        {/*<TableCell align={'right'}>Type</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personsData
                        // TODO: Doesn't the paging work out-of-the-box? Why the calculations?
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className={classes.buttonIcons}>
                                    <IconButton aria-label={'edit'} onClick={() => handleEdit(row.id)}>
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton aria-label={'delete'} onClick={() => handleDelete(row.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell scope={'row'}>{row.firstName}</TableCell>
                                <TableCell align={'right'}>{row.lastName}</TableCell>
                                <TableCell
                                    align={'right'}
                                    className={classes.address}
                                >{`${row.address.addressLine1}, ${row.address.postCode}, ${row.address.city}`}</TableCell>
                                <TableCell align={'right'}>{row.email}</TableCell>
                                <TableCell align={'right'}>{row.mobilePhone}</TableCell>
                                <TableCell align={'right'}>{row.landline ? row.landline : 'n/a'}</TableCell>
                                <TableCell align={'right'}>{row.birthday ? row.birthday : 'n/a'}</TableCell>
                                <TableCell align={'right'}>{row.role}</TableCell>
                                {/*<TableCell align={'right'}>{row.type}</TableCell>*/}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={personsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default PersonsTable;
