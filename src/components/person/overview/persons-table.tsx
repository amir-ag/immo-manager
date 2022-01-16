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
import { PersonModel } from '../model/person.model';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/use-delete-prompt.hook';
import { formatNormalizedDateToShortString } from '../../../services/date-utils.service';

const useStyles = makeStyles((theme) => ({
    buttonIcons: {
        display: 'flex',
    },
    address: {
        whiteSpace: 'nowrap',
    },
    hideTableCellWhenMd: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    hideTableCellWhenSm: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

type ContentTableProps = {
    personsData: PersonModel[];
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
};

const PersonsTable = ({ personsData, handleDelete, handleEdit }: ContentTableProps) => {
    const cssClasses = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

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
                            <TableCell align={'right'} className={cssClasses.hideTableCellWhenMd}>
                                Address
                            </TableCell>
                            <TableCell align={'right'} className={cssClasses.hideTableCellWhenSm}>
                                Email
                            </TableCell>
                            <TableCell align={'right'} className={cssClasses.hideTableCellWhenSm}>
                                Mobile Phone
                            </TableCell>
                            <TableCell align={'right'} className={cssClasses.hideTableCellWhenMd}>
                                Birthday
                            </TableCell>
                            <TableCell align={'right'}>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personsData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((p, index) => (
                                <TableRow key={index}>
                                    <TableCell className={cssClasses.buttonIcons}>
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
                                        className={`${cssClasses.address} ${cssClasses.hideTableCellWhenMd}`}
                                    >
                                        {p.address.addressLine1}
                                        <br />
                                        {`${p.address.postCode} ${p.address.city}`}
                                    </TableCell>
                                    <TableCell align={'right'} className={cssClasses.hideTableCellWhenSm}>
                                        {p.email}
                                    </TableCell>
                                    <TableCell align={'right'} className={cssClasses.hideTableCellWhenSm}>
                                        {p.mobilePhone}
                                    </TableCell>
                                    <TableCell align={'right'} className={cssClasses.hideTableCellWhenMd}>
                                        {formatNormalizedDateToShortString(p.birthday)}
                                    </TableCell>
                                    <TableCell align={'right'}>
                                        {
                                            // Slicing enables sorting of readonly array
                                            p.roles?.slice()?.sort()?.join(', ')
                                        }
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
