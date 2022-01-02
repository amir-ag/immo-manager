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
    useMediaQuery,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { PersonModel } from '../models/person.model';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import theme from '../../../theme/theme';

const useStyles = makeStyles({
    buttonIcons: {
        display: 'flex',
    },
    address: {
        whiteSpace: 'nowrap',
    },
    hide: {
        display: 'none',
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
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

    const display = () => {
        return isSmDown ? classes.hide : '';
    };

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <DeletePrompt
                open={deletePromptOpen}
                title={'Delete Person?'}
                description={'Are you sure you want to delete this person?'}
                handleClose={handleCancelDelete}
                handleDeletion={() => handleDelete(entityToDelete)}
            />
            <TableContainer component={Paper}>
                <Table aria-label={'people table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell align={'right'}>First Name</TableCell>
                            <TableCell align={'right'}>Last Name</TableCell>
                            <TableCell align={'right'} className={display()}>
                                Address
                            </TableCell>
                            <TableCell align={'right'} className={display()}>
                                Email
                            </TableCell>
                            <TableCell align={'right'} className={display()}>
                                Mobile Phone
                            </TableCell>
                            <TableCell align={'right'} className={display()}>
                                Phone
                            </TableCell>
                            <TableCell align={'right'} className={display()}>
                                Birthday
                            </TableCell>
                            <TableCell align={'right'} className={display()}>
                                Role
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personsData
                            // TODO: Doesn't the paging work out-of-the-box? Why the calculations?
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((p, index) => (
                                <TableRow key={index}>
                                    <TableCell className={classes.buttonIcons}>
                                        <IconButton aria-label={'edit'} onClick={() => handleEdit(p.id)}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label={'delete'}
                                            onClick={() => handleOpenDeletePrompt(p.id)}
                                        >
                                            <DeleteOutlineIcon color={'error'} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align={'right'} scope={'row'}>
                                        {p.firstName}
                                    </TableCell>
                                    <TableCell align={'right'}>{p.lastName}</TableCell>
                                    <TableCell
                                        align={'right'}
                                        className={`${classes.address} ${display()}`}
                                    >{`${p.address.addressLine1}, ${p.address.postCode}, ${p.address.city}`}</TableCell>
                                    <TableCell align={'right'} className={display()}>
                                        {p.email}
                                    </TableCell>
                                    <TableCell align={'right'} className={display()}>
                                        {p.mobilePhone}
                                    </TableCell>
                                    <TableCell align={'right'} className={display()}>
                                        {p.landline ? p.landline : 'n/a'}
                                    </TableCell>
                                    <TableCell align={'right'} className={display()}>
                                        {p.birthday ? p.birthday : 'n/a'}
                                    </TableCell>
                                    <TableCell align={'right'} className={display()}>
                                        {p.role}
                                    </TableCell>
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
        </>
    );
};

export default PersonsTable;
