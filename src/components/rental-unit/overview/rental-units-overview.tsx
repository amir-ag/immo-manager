import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectPersonsTenants, selectRentalUnits, selectTenancies } from '../../../store/selectors';
import { deleteRentalUnit } from '../../../store/slices/rental-units.slice';
import { deleteTenancy } from '../../../store/slices/tenancies.slice';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';
import { RentalUnitsTable } from './rental-units-table';
import { stylingConstants } from '../../../theme/shared-styles';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { PropertyModel } from '../../property/model/property.model';

type RentalUnitsOverviewProps = {
    disableCreate: boolean;
    relatedProperty: PropertyModel | null;
};

export const RentalUnitsOverview = ({ disableCreate, relatedProperty }: RentalUnitsOverviewProps) => {
    const history = useHistory();

    const dispatch = useAppDispatch();
    // TODO: Extract these filter methods into its own file - for each entity its own
    const rentalUnits = useAppSelector(selectRentalUnits)?.filter(
        (ru) => ru.propertyId === relatedProperty?.id
    );
    const tenancies = useAppSelector(selectTenancies).filter((ten) => ten.propertyId === relatedProperty?.id);
    const tenants = useAppSelector(selectPersonsTenants);

    const [searchResult, setSearchResult] = useState(rentalUnits);

    const handleDelete = (ruId: string) => {
        dispatch(deleteRentalUnit(ruId));
        // TODO: Combine these store actions within the store (transparent)
        tenancies
            ?.filter((ten) => ten.rentalUnitId === ruId)
            ?.forEach((ten) => {
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
            spacing={stylingConstants.gridSpacing}
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
                    tenancies={tenancies}
                    tenants={tenants}
                    handleDelete={handleDelete}
                    searchResult={searchResult}
                />
            </Grid>
        </Grid>
    );
};
