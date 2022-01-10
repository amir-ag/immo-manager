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
    TableRow,
} from '@material-ui/core';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDeletePrompt } from '../../../hooks/use-delete-prompt.hook';
import { TenancyModel } from '../model/tenancy.model';
import { format, parseISO } from 'date-fns';
import { PersonModel } from '../../person/model/person.model';
import * as tenancyService from '../service/tenancy.service';
import * as constants from '../../../constants';

type TenanciesTableProps = {
    tenants: PersonModel[];
    handleDelete: (ruId: string) => void;
    searchResult: TenancyModel[];
};

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    tableCellVacancy: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
    },
}));

export const TenanciesTable = ({ tenants, handleDelete, searchResult }: TenanciesTableProps) => {
    const cssClasses = useStyles();

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    return (
        <>
            <DeletePrompt
                open={deletePromptOpen}
                title={'Delete Tenancy?'}
                description={'Are you sure you want to delete this tenancy?'}
                handleClose={handleCancelDelete}
                handleDeletion={() => handleDelete(entityToDelete)}
            />
            <TableContainer component={Paper}>
                <Table className={cssClasses.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell align="right">Tenant(s)</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">To</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResult.map((ten) => (
                            <TableRow key={ten.id}>
                                <TableCell>
                                    <IconButton
                                        aria-label={'edit'}
                                        component={Link}
                                        to={routes.getTenancyDetailRouteById(ten.id)}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label={'delete'}
                                        onClick={() => handleOpenDeletePrompt(ten.id)}
                                    >
                                        <DeleteOutlineIcon color={'error'} />
                                    </IconButton>
                                </TableCell>
                                <TableCell className={ten.isVacancy ? cssClasses.tableCellVacancy : ''}>
                                    {ten.isVacancy
                                        ? 'Vacancy'
                                        : tenancyService
                                              .getTenantsOfTenancy(ten, tenants)
                                              .map((t) => t.firstName + ' ' + t.lastName)
                                              .join(', ')}
                                </TableCell>
                                <TableCell align="right">
                                    {ten.beginOfContract
                                        ? format(parseISO(ten.beginOfContract), constants.dateFormatShort)
                                        : '-'}
                                </TableCell>
                                <TableCell align="right">
                                    {ten.endOfContract
                                        ? format(parseISO(ten.endOfContract), constants.dateFormatShort)
                                        : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
