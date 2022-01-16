import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectAllRentalUnits, selectAllTenancies, selectTenants } from '../../../store/selectors';
import { deleteRentalUnit } from '../../../store/slices/rental-units.slice';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';
import { RentalUnitsTable } from './rental-units-table';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { PropertyModel } from '../../property/model/property.model';
import { gridSpacingBig } from '../../../theme/shared-styles';
import { getRentalUnitsByPropertyId } from '../service/rental-unit.service';
import { InfoBox } from '../../ui/info-box/info-box';

type RentalUnitsOverviewProps = {
    disableCreate: boolean;
    relatedProperty: PropertyModel | null;
};

export const RentalUnitsOverview = ({ disableCreate, relatedProperty }: RentalUnitsOverviewProps) => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const allRentalUnits = useAppSelector(selectAllRentalUnits);
    const relatedRentalUnits = getRentalUnitsByPropertyId(relatedProperty?.id ?? '', allRentalUnits);
    const allTenancies = useAppSelector(selectAllTenancies);
    const allTenants = useAppSelector(selectTenants);

    const [searchResult, setSearchResult] = useState(relatedRentalUnits);

    /*
        Do not use the filtered rental units here as a dependency.
        Otherwise 'useEffect()' will trigger a loop because the reference
        is always a new one due to the nature of the '.filter()' function.
    */
    useEffect(() => {
        setSearchResult(relatedRentalUnits);
        // eslint-disable-next-line
    }, [allRentalUnits]);

    const handleDelete = (ruId: string) => {
        dispatch(deleteRentalUnit({ id: ruId, performSilently: false }));
    };

    const handleCreate = () => {
        history.push(routes.RENTAL_UNITS_CREATE);
    };

    return (
        <Grid
            item
            container
            xs={12}
            sm={6}
            spacing={gridSpacingBig}
            alignItems={'center'}
            alignContent={'flex-start'}
        >
            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h2'}>
                    Associated Rental Units
                </Typography>
            </Grid>
            <SearchHeader
                placeholderText={'Search by description'}
                handleCreate={handleCreate}
                originalData={relatedRentalUnits}
                setSearchResult={setSearchResult}
                disableCreateButton={disableCreate}
                searchParams={['ewid', 'type', 'numberOfRooms', 'floorLevel']}
                wrapAtMd={true}
            />
            <Grid item xs={12}>
                {relatedRentalUnits?.length ? (
                    <RentalUnitsTable
                        allTenancies={allTenancies}
                        allTenants={allTenants}
                        handleDelete={handleDelete}
                        searchResult={searchResult}
                    />
                ) : (
                    <InfoBox
                        title="No Rental Units found!"
                        text={`This property currently doesn't have any rental units. ${
                            disableCreate ? 'Start by creating the property first!' : 'Start by creating one!'
                        }`}
                        noButton={disableCreate}
                        buttonText="Create"
                        handleButtonClick={() => handleCreate()}
                    />
                )}
            </Grid>
        </Grid>
    );
};
