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
import { gridSpacingBig } from '../../../theme/shared-styles';
import { getTenanciesByRentalUnitId } from '../service/tenancy.service';
import { InfoBox } from '../../ui/info-box/info-box';

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
        // eslint-disable-next-line
    }, [allTenancies]);

    const handleDelete = (tenId: string) => {
        dispatch(deleteTenancy({ id: tenId, performSilently: false }));
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
            spacing={gridSpacingBig}
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
                {relatedTenancies?.length ? (
                    <TenanciesTable
                        tenants={tenants}
                        handleDelete={handleDelete}
                        searchResult={searchResult}
                    />
                ) : (
                    <InfoBox
                        title="No Tenancies found!"
                        text={`This rental unit currently doesn't have any tenancies. ${
                            disableCreate
                                ? 'Start by creating the rental unit first!'
                                : 'Start by creating one!'
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
