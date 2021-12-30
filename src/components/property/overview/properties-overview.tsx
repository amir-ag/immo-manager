import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import PropertyCard from './property-card';
import routes from '../../../routes/route-constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hooks';
import { selectProperties, selectRentalUnits, selectTenancies } from '../../../store/selectors';
import { deleteProperty, getProperties } from '../../../store/slices/properties.slice';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/ui.hooks';
import { deleteRentalUnit, getRentalUnits } from '../../../store/slices/rental-units.slice';
import { deleteTenancy, getTenancies } from '../../../store/slices/tenancies.slice';
import { useHistory } from 'react-router';
import SearchHeader from '../../ui/search-header/search-header';

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

    const history = useHistory();
    const [searchResult, setSearchResult] = useState(properties);

    useEffect(() => {
        dispatch(getProperties());
        dispatch(getRentalUnits());
        dispatch(getTenancies());
    }, [dispatch]);

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

    const handleCreate = () => {
        history.push(routes.PROPERTIES_CREATE);
    };

    return (
        <>
            {showHeader && (
                <>
                    {/* TODO: Check if it makes sense to extract search header (input + button) as component */}
                    <Typography className={cssClasses.headerElements} variant={'h5'}>
                        Properties Overview
                    </Typography>
                    <SearchHeader
                        placeholderText={'Search by name or address...'}
                        handleCreate={handleCreate}
                        originalData={properties}
                        setSearchResult={setSearchResult}
                        searchParams={['name', 'address.addressLine1', 'address.city']}
                    />
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
                {searchResult.map((property) => (
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
