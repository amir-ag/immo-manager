import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    selectPersonsTenants,
    selectProperties,
    selectRentalUnits,
    selectTenancies,
} from '../../store/selectors';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { RentalUnitModel } from '../rental-unit/model/rental-unit.model';
import { emptyTenancy } from '../tenancy/model/tenancy.model';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { useReactToPrint } from 'react-to-print';
import { getDisplayNameOfProperty } from '../property/model/property.model';
import RentSchedulePropertyTable from './tables/rent-schedule-property-table';
import RentScheduleUnitsTable from './tables/rent-schedule-units-table';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { getTenancies } from '../../store/slices/tenancies.slice';
import { getPersons } from '../../store/slices/persons.slice';

const useStyles = makeStyles((theme) => ({
    exportContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(3),
    },
    title: {
        marginTop: theme.spacing(5),
    },
}));

const RentScheduleOverview = () => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTenancies());
        dispatch(getPersons());
    }, [dispatch]);

    const classes = useStyles();

    const { id } = useParams<{ id: string }>();

    const property = useAppSelector(selectProperties).filter((property) => property.id === id)[0];
    const rentalUnits = useAppSelector(selectRentalUnits).filter((unit) => unit.propertyId === id);
    const tenancies = useAppSelector(selectTenancies);
    const tenants = useAppSelector(selectPersonsTenants);

    const getTenancy = (unit: RentalUnitModel) => {
        return tenancies.filter((tenancy) => tenancy.rentalUnitId === unit.id)[0] || emptyTenancy;
    };

    return (
        <>
            <div className={classes.exportContainer}>
                <Button variant={'outlined'} onClick={handlePrint} endIcon={<GetAppOutlinedIcon />}>
                    Export as PDF
                </Button>
            </div>
            <Container ref={componentRef}>
                <Typography className={classes.title} variant={'h5'}>
                    Rent Schedule Report for {getDisplayNameOfProperty(property)}
                </Typography>
                <RentSchedulePropertyTable {...property} />
                <RentScheduleUnitsTable rentalUnits={rentalUnits} getTenancy={getTenancy} tenants={tenants} />
            </Container>
        </>
    );
};

export default RentScheduleOverview;
