import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectRentalUnitsByPropertyId, selectTenancies, selectTenants } from '../../../store/selectors';
import { deleteRentalUnit } from '../../../store/slices/rental-units.slice';
import { deleteTenancy } from '../../../store/slices/tenancies.slice';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';
import { RentalUnitsTable } from './rental-units-table';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { PropertyModel } from '../../property/model/property.model';
import { getTenanciesByRentalUnitId } from '../../tenancy/service/tenancy.service';
import { gridSpacing } from '../../../theme/shared-styles';

type RentalUnitsOverviewProps = {
    disableCreate: boolean;
    relatedProperty: PropertyModel | null;
};

export const RentalUnitsOverview = ({ disableCreate, relatedProperty }: RentalUnitsOverviewProps) => {
    const history = useHistory();

    const dispatch = useAppDispatch();
    const rentalUnits = useAppSelector(selectRentalUnitsByPropertyId(relatedProperty?.id ?? ''));
    const allTenancies = useAppSelector(selectTenancies);
    const allTenants = useAppSelector(selectTenants);

    const [searchResult, setSearchResult] = useState(rentalUnits);

    const handleDelete = (ruId: string) => {
        dispatch(deleteRentalUnit(ruId));
        // TODO: Combine these store actions within the store (transparent)
        getTenanciesByRentalUnitId(ruId, allTenancies)?.forEach((ten) => {
            dispatch(deleteTenancy(ten.id));
        });
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
            spacing={gridSpacing}
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
                originalData={rentalUnits}
                setSearchResult={setSearchResult}
                disableCreateButton={disableCreate}
                searchParams={['ewid', 'type', 'numberOfRooms', 'floorLevel']}
                wrapAtMd={true}
            />
            <Grid item xs={12}>
                <RentalUnitsTable
                    allTenancies={allTenancies}
                    allTenants={allTenants}
                    handleDelete={handleDelete}
                    searchResult={searchResult}
                />
            </Grid>
        </Grid>
    );
};
