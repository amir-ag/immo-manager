import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PropertyCard from './property-card';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectAllProperties, selectAllRentalUnits, selectAllTenancies } from '../../../store/selectors';
import { deleteProperty } from '../../../store/slices/properties.slice';
import DeletePrompt from '../../ui/delete-prompt/delete-prompt';
import { useDeletePrompt } from '../../../hooks/use-delete-prompt.hook';
import { useHistory } from 'react-router';
import SearchHeader from '../../ui/search-header/search-header';
import { IntroHeader } from '../../ui/intro-header/intro-header';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import * as rentalUnitService from '../../rental-unit/service/rental-unit.service';
import * as tenancyService from '../../tenancy/service/tenancy.service';
import { gridSpacingBig } from '../../../theming/theming-constants';
import { InfoBox } from '../../ui/info-box/info-box';

type PropertiesViewProps = {
    showSearchHeader?: boolean;
};

const PropertiesOverview = ({ showSearchHeader = true }: PropertiesViewProps) => {
    const dispatch = useAppDispatch();
    const allProperties = useAppSelector(selectAllProperties);
    const allRentalUnits = useAppSelector(selectAllRentalUnits);
    const allTenancies = useAppSelector(selectAllTenancies);
    const [searchResult, setSearchResult] = useState(allProperties);

    const history = useHistory();

    useEffect(() => {
        setSearchResult(allProperties);
    }, [allProperties]);

    const { deletePromptOpen, entityToDelete, handleOpenDeletePrompt, handleCancelDelete } =
        useDeletePrompt();

    const handleDelete = () => {
        dispatch(deleteProperty(entityToDelete));
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
                        placeholderText={'Search by egid, name or address...'}
                        handleCreate={handleCreate}
                        originalData={allProperties}
                        setSearchResult={setSearchResult}
                        searchParams={['name', 'egid', 'address.addressLine1', 'address.city']}
                    />
                </>
            )}
            {allProperties?.length ? (
                <>
                    <DeletePrompt
                        open={deletePromptOpen}
                        title={'Delete Property?'}
                        description={
                            'Are you sure you want to delete this property? This will also delete all linked rental units and tenancies!'
                        }
                        handleClose={handleCancelDelete}
                        handleDeletion={handleDelete}
                    />
                    <Grid container spacing={gridSpacingBig} justifyContent="space-evenly">
                        {searchResult.map((property) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={property.id}>
                                <PropertyCard
                                    property={property}
                                    handleDelete={() => handleOpenDeletePrompt(property.id)}
                                    rentalUnits={rentalUnitService.getRentalUnitsByPropertyId(
                                        property.id,
                                        allRentalUnits
                                    )}
                                    tenancies={tenancyService.getTenanciesByPropertyId(
                                        property.id,
                                        allTenancies
                                    )}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <InfoBox
                    title="No Properties found!"
                    text="You currently don't have any properties. Start by creating one!"
                    buttonText="Create"
                    handleButtonClick={() => handleCreate()}
                />
            )}
        </>
    );
};

export default PropertiesOverview;
