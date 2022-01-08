import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectPersonsTenants, selectTenancies } from '../../../store/selectors';
import { deleteTenancy } from '../../../store/slices/tenancies.slice';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';
import { TenanciesTable } from './tenancies-table';
import { stylingConstants } from '../../../theme/shared-styles';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { RentalUnitModel } from '../../rental-unit/model/rental-unit.model';

type TenanciesOverviewProps = {
    disableCreate: boolean;
    relatedRentalUnit: RentalUnitModel | null;
};

export const TenanciesOverview = ({ disableCreate, relatedRentalUnit }: TenanciesOverviewProps) => {
    const history = useHistory();

    const dispatch = useAppDispatch();
    const tenants = useAppSelector(selectPersonsTenants);
    const tenancies = useAppSelector(selectTenancies)?.filter(
        (t) => t.rentalUnitId === relatedRentalUnit?.id
    );

    const [searchResult, setSearchResult] = useState(tenancies);

    const handleDelete = (tenId: string) => {
        dispatch(deleteTenancy(tenId));
    };

    const handleCreate = () => {
        history.push(routes.TENANCIES_CREATE);
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
                    Associated Tenancies
                </Typography>
            </Grid>
            <SearchHeader
                placeholderText={'Search by date (yyyy-MM-dd)'}
                handleCreate={handleCreate}
                originalData={tenancies}
                setSearchResult={setSearchResult}
                disableCreateButton={disableCreate}
                searchParams={['beginOfContract', 'endOfContract']}
                wrapAtMd={true}
            />
            <Grid item xs={12}>
                <TenanciesTable tenants={tenants} handleDelete={handleDelete} searchResult={searchResult} />
            </Grid>
        </Grid>
    );
};
