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
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import { TenancyModel } from '../../tenancy/model/tenancy.model';
import { parseISO } from 'date-fns';
import { PersonModel } from '../../person/model/person.model';
import * as rentalUnitService from '../service/rental-unit.service';
import * as tenancyService from '../../tenancy/service/tenancy.service';

type RentalUnitsTableProps = {
    tenancies: TenancyModel[];
    tenants: PersonModel[];
    handleDelete: (ruId: string) => void;
    searchResult: RentalUnitModel[];
};

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

export const RentalUnitsTable = ({
    tenancies,
    tenants,
    handleDelete,
    searchResult,
}: RentalUnitsTableProps) => {
    const cssClasses = useStyles();

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const getTenantsDesc = (ruId: string) => {
        const ts = tenancyService.getTenantsOfTenancy(
            // TODO reuse filters and finds
            tenancies
                ?.filter((t) => !t.endOfContract || parseISO(t.endOfContract) > new Date())
                ?.find((ten) => ten.rentalUnitId === ruId),
            tenants
        );

        if (!ts.length) {
            return 'Vacancy';
        }

        return ts.join(', ');
    };

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
                                {/* // TODO: Make font bold and red (error) if it is a Vacancy */}
                                <TableCell align="right">{getTenantsDesc(ru.id)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
