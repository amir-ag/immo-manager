import React from 'react';
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import PropertyCard from './property-card';
import AddIcon from '@material-ui/icons/Add';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hooks';
import { selectProperties, selectRentalUnits, selectTenancies } from '../../../store/selectors';
import { deleteProperty, getProperties } from '../../../store/slices/properties.slice';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import { deleteRentalUnit } from '../../../store/slices/rental-units.slice';
import { deleteTenancy } from '../../../store/slices/tenancy.slice';

const gridSpacing = 3;

const useStyles = makeStyles((theme) => ({
    headerControls: {
        width: '100%',
    },
    headerElements: {
        marginBottom: theme.spacing(4),
    },
}));

type PropertiesViewProps = {
    showHeader?: boolean;
};

const PropertiesOverview = ({ showHeader = true }: PropertiesViewProps) => {
    const cssClasses = useStyles();

    const dispatch = useAppDispatch();
    const properties = useAppSelector(selectProperties);
    const rentalUnits = useAppSelector(selectRentalUnits);
    const tenancies = useAppSelector(selectTenancies);

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleDelete = () => {
        dispatch(deleteProperty(entityToDelete));
        // TODO: Combine these store actions within the store (transparent)
        rentalUnits
            ?.filter((ru) => ru.propertyId === entityToDelete)
            ?.forEach((ru) => {
                dispatch(deleteRentalUnit(ru.id));
                tenancies
                    ?.filter((ten) => ten.rentalUnitId === ru.id)
                    ?.forEach((ten) => dispatch(deleteTenancy(ten.id)));
            });
        dispatch(getProperties());
    };

    return (
        <>
            {showHeader && (
                <>
                    {/* TODO: Check if it makes sense to extract search header (input + button) as component */}
                    <Typography className={cssClasses.headerElements} variant={'h5'}>
                        Properties Overview
                    </Typography>
                    <Grid
                        container
                        className={cssClasses.headerElements}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={gridSpacing}
                    >
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="textSearch"
                                className={cssClasses.headerControls}
                                variant="outlined"
                                label="Search for street name, post code, city, ..."
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                component={Link}
                                to={routes.PROPERTIES_CREATE}
                                className={cssClasses.headerControls}
                                fullWidth
                                variant="contained"
                                color="secondary"
                                startIcon={<AddIcon />}
                            >
                                New
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
            <DeletePrompt
                open={deletePromptOpen}
                title={'Delete Property?'}
                description={
                    'Are you sure you want to delete this property? This will also delete all linked rental units and tenancies!'
                }
                handleClose={handleCancelDelete}
                handleDeletion={handleDelete}
            />
            <Grid container spacing={gridSpacing} justifyContent="space-evenly">
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                        <PropertyCard
                            property={property}
                            handleDelete={() => handleOpenDeletePrompt(property.id)}
                            rentalUnits={rentalUnits.filter((ru) => ru.propertyId === property.id)}
                            tenancies={tenancies.filter((ten) => ten.propertyId === property.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PropertiesOverview;
