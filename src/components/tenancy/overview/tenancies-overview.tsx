import React, { useEffect, useState } from 'react';
import {
    Grid,
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
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hooks';
import { selectCurrentRentalUnit, selectPersonsTenants, selectTenancies } from '../../../store/selectors';
import { deleteTenancy, getTenancies } from '../../../store/slices/tenancies.slice';
import { getTenantsOfTenancy } from '../model/tenancy.model';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
    tableCellVacancy: {
        color: 'red',
        fontWeight: 'bold',
    },
}));

export const TenanciesOverview = ({ disableCreate }: { disableCreate: boolean }) => {
    const cssClasses = useStyles();
    const history = useHistory();

    const dispatch = useAppDispatch();
    const rentalUnit = useAppSelector(selectCurrentRentalUnit);
    const tenants = useAppSelector(selectPersonsTenants);
    const tenancies = useAppSelector(selectTenancies)?.filter((t) => t.rentalUnitId === rentalUnit?.id);

    useEffect(() => {
        dispatch(getTenancies());
    }, [dispatch]);

    const [searchResult, setSearchResult] = useState(tenancies);

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleDelete = () => {
        dispatch(deleteTenancy(entityToDelete));
        dispatch(getTenancies());
    };

    const handleCreate = () => {
        history.push(routes.TENANCIES_CREATE);
    };

    return (
        <>
            <Grid item xs={12}>
                <Typography variant={'h6'}>Tenancies</Typography>
            </Grid>
            <SearchHeader
                placeholderText={'Search by description'}
                handleCreate={handleCreate}
                originalData={tenancies}
                setSearchResult={setSearchResult}
                disableCreateButton={disableCreate}
                searchParams={['beginOfContract', 'endOfContract']}
                wrapAtMd={true}
            />
            <Grid item xs={12}>
                <DeletePrompt
                    open={deletePromptOpen}
                    title={'Delete Tenancy?'}
                    description={'Are you sure you want to delete this tenancy?'}
                    handleClose={handleCancelDelete}
                    handleDeletion={handleDelete}
                />
                {/* TODO: Check if it makes sense to extract table as component */}
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
                                            : getTenantsOfTenancy(ten, tenants)
                                                  .map((t) => t.firstName + ' ' + t.lastName)
                                                  .join(', ')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {ten.beginOfContract
                                            ? format(parseISO(ten.beginOfContract), 'dd.MM.yyyy')
                                            : '-'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {ten.endOfContract
                                            ? format(parseISO(ten.endOfContract), 'dd.MM.yyyy')
                                            : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};
