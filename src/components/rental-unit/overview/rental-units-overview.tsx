import React, { useEffect } from 'react';
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { getDisplayNameOfRentalUnit } from '../model/rental-unit.model';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hooks';
import {
    selectCurrentProperty,
    selectPersonsTenants,
    selectRentalUnits,
    selectTenancies,
} from '../../../store/selectors';
import { deleteRentalUnit, getRentalUnits } from '../../../store/slices/rental-units.slice';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { deleteTenancy, getTenancies } from '../../../store/slices/tenancy.slice';
import { getTenantsOfTenancy } from '../../tenancy/model/tenancy.model';
import { parseISO } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
    },
}));

export const RentalUnitsOverview = ({ disableCreate }: { disableCreate: boolean }) => {
    const cssClasses = useStyles();

    const dispatch = useAppDispatch();
    const property = useAppSelector(selectCurrentProperty);
    // TODO: Extract these helper methods into its own file - for each entity its own
    const rentalUnits = useAppSelector(selectRentalUnits)?.filter((ru) => ru.propertyId === property?.id);
    const tenancies = useAppSelector(selectTenancies).filter((ten) => ten.propertyId === property?.id);
    const tenants = useAppSelector(selectPersonsTenants);

    useEffect(() => {
        dispatch(getRentalUnits());
        dispatch(getTenancies());
    }, [dispatch]);

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleDelete = () => {
        dispatch(deleteRentalUnit(entityToDelete));
        // TODO: Combine these store actions within the store (transparent)
        tenancies
            ?.filter((ten) => ten.rentalUnitId === entityToDelete)
            ?.forEach((ten) => {
                dispatch(deleteTenancy(ten.id));
            });
        dispatch(getRentalUnits());
    };

    const getTenantsDesc = (ruId: string) => {
        const ts = getTenantsOfTenancy(
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
            {/* TODO: Check if it makes sense to extract search header (input + button) as component */}
            <Grid item xs={12}>
                <Typography variant={'h6'}>Rental Units</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    id="textSearch"
                    variant="outlined"
                    fullWidth
                    label="Search for Name"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Button
                    component={Link}
                    to={routes.RENTAL_UNITS_CREATE}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    disabled={disableCreate}
                >
                    New
                </Button>
            </Grid>
            <Grid item xs={12}>
                <DeletePrompt
                    open={deletePromptOpen}
                    title={'Delete Rental Unit?'}
                    description={
                        'Are you sure you want to delete this rental unit? This will also delete all linked tenancies!'
                    }
                    handleClose={handleCancelDelete}
                    handleDeletion={handleDelete}
                />
                {/* TODO: Check if it makes sense to extract table as component */}
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
                            {rentalUnits?.map((ru) => (
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
                                    <TableCell align="right">{getDisplayNameOfRentalUnit(ru)}</TableCell>
                                    {/* // TODO: Make font bold and red (error) if it is a Vacancy */}
                                    <TableCell align="right">{getTenantsDesc(ru.id)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
};
