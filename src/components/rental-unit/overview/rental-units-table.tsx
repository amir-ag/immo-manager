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
import { RentalUnitModel } from '../model/rental-unit.model';
import { useDeletePrompt } from '../../../hooks/use-delete-prompt.hook';
import { TenancyModel } from '../../tenancy/model/tenancy.model';
import { PersonModel } from '../../person/model/person.model';
import * as rentalUnitService from '../service/rental-unit.service';
import * as tenancyService from '../../tenancy/service/tenancy.service';

type RentalUnitsTableProps = {
    allTenancies: TenancyModel[];
    allTenants: PersonModel[];
    handleDelete: (ruId: string) => void;
    searchResult: RentalUnitModel[];
};

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    vacancyTableCell: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
    },
}));

export const RentalUnitsTable = ({
    allTenancies,
    allTenants,
    handleDelete,
    searchResult,
}: RentalUnitsTableProps) => {
    const cssClasses = useStyles();

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const getTenantsDesc = (ruId: string) => {
        const ts = tenancyService.getTenantsOfTenancy(
            tenancyService.getRunningTenancyByRentalUnitId(ruId, allTenancies),
            allTenants
        );

        if (!ts.length) {
            return 'Vacancy';
        }

        return ts.map((tenant) => `${tenant.firstName} ${tenant.lastName}`).join(', ');
    };

    const getTenantsBodyCell = (desc: string) => (
        <TableCell
            align="right"
            className={desc.toLowerCase().includes('vacancy') ? cssClasses.vacancyTableCell : ''}
        >
            {desc}
        </TableCell>
    );

    return (
        <>
            <DeletePrompt
                open={deletePromptOpen}
                title={'Delete Rental Unit?'}
                description={
                    'Are you sure you want to delete this rental unit? This will also delete all linked tenancies!'
                }
                handleClose={handleCancelDelete}
                handleDeletion={() => handleDelete(entityToDelete)}
            />
            <TableContainer component={Paper}>
                <Table className={cssClasses.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Current Tenant</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResult?.map((ru) => (
                            <TableRow key={ru.id}>
                                <TableCell>
                                    <IconButton
                                        aria-label={'edit'}
                                        component={Link}
                                        to={routes.getRentalUnitDetailRouteById(ru.id)}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label={'delete'}
                                        onClick={() => handleOpenDeletePrompt(ru.id)}
                                    >
                                        <DeleteOutlineIcon color={'error'} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    {rentalUnitService.getDisplayNameOfRentalUnit(ru)}
                                </TableCell>
                                {getTenantsBodyCell(getTenantsDesc(ru.id))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
