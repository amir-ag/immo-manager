import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import routes from '../../../routes/route-constants';
import { useAppDispatch } from '../../../hooks/store/use-app-dispatch.hook';
import { selectAllTenancies, selectTenants } from '../../../store/selectors';
import { deleteTenancy } from '../../../store/slices/tenancies.slice';
import SearchHeader from '../../ui/search-header/search-header';
import { useHistory } from 'react-router';
import { TenanciesTable } from './tenancies-table';
import { useAppSelector } from '../../../hooks/store/use-app-selector.hook';
import { RentalUnitModel } from '../../rental-unit/model/rental-unit.model';
import { gridSpacing } from '../../../theme/shared-styles';
import { getTenanciesByRentalUnitId } from '../service/tenancy.service';

type TenanciesOverviewProps = {
    disableCreate: boolean;
    relatedRentalUnit: RentalUnitModel | null;
};

export const TenanciesOverview = ({ disableCreate, relatedRentalUnit }: TenanciesOverviewProps) => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const tenants = useAppSelector(selectTenants);
    const allTenancies = useAppSelector(selectAllTenancies);
    const relatedTenancies = getTenanciesByRentalUnitId(relatedRentalUnit?.id ?? '', allTenancies);

    const [searchResult, setSearchResult] = useState(relatedTenancies);

    /*
        Do not use the filtered rental units here as a dependency.
        Otherwise 'useEffect()' will trigger a loop because the reference
        is always a new one due to the nature of the '.filter()' function.
    */
    useEffect(() => {
        setSearchResult(relatedTenancies);
    }, [allTenancies]);

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
            spacing={gridSpacing}
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
                originalData={relatedTenancies}
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
