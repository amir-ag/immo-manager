import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PropertyCard from './property-card';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectProperties, selectRentalUnits, selectTenancies } from '../../../store/selectors';
import { deleteProperty } from '../../../store/slices/properties.slice';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/use-delete-prompt.hook';
import { deleteRentalUnit } from '../../../store/slices/rental-units.slice';
import { deleteTenancy } from '../../../store/slices/tenancies.slice';
import { useHistory } from 'react-router';
import SearchHeader from '../../ui/search-header/search-header';
import { IntroHeader } from '../../ui/intro-header/intro-header';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import * as rentalUnitService from '../../rental-unit/service/rental-unit.service';
import * as tenancyService from '../../tenancy/service/tenancy.service';
import { gridSpacing } from '../../../theme/shared-styles';

type PropertiesViewProps = {
    showSearchHeader?: boolean;
};

const PropertiesOverview = ({ showSearchHeader = true }: PropertiesViewProps) => {
    const dispatch = useAppDispatch();
    const properties = useAppSelector(selectProperties);
    const rentalUnits = useAppSelector(selectRentalUnits);
    const tenancies = useAppSelector(selectTenancies);
    const [searchResult, setSearchResult] = useState(properties);

    const history = useHistory();

    useEffect(() => {
        setSearchResult(properties);
    }, [properties]);

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleDelete = () => {
        dispatch(deleteProperty(entityToDelete));
        // TODO: Combine these store actions within the store (transparent)
        rentalUnitService.getRentalUnitsByPropertyId(entityToDelete, rentalUnits)?.forEach((ru) => {
            dispatch(deleteRentalUnit(ru.id));
            tenancyService
                .getTenanciesByRentalUnitId(ru.id, tenancies)
                ?.forEach((ten) => dispatch(deleteTenancy(ten.id)));
        });
    };

    const handleCreate = () => {
        history.push(routes.PROPERTIES_CREATE);
    };

    return (
        <>
            {showSearchHeader && (
                <>
                    <IntroHeader
                        title="Manage Properties"
                        subtitle="Search, create, edit, ... all properties."
                    />
                    <SearchHeader
                        placeholderText={'Search by name or address...'}
                        handleCreate={handleCreate}
                        originalData={properties}
                        setSearchResult={setSearchResult}
                        searchParams={['name', 'egid', 'address.addressLine1', 'address.city']}
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
                    <Grid item xs={12} sm={6} md={4} xl={3} key={property.id}>
                        <PropertyCard
                            property={property}
                            handleDelete={() => handleOpenDeletePrompt(property.id)}
                            rentalUnits={rentalUnitService.getRentalUnitsByPropertyId(
                                property.id,
                                rentalUnits
                            )}
                            tenancies={tenancyService.getTenanciesByPropertyId(property.id, tenancies)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PropertiesOverview;
