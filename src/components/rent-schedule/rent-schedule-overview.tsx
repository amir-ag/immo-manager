import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    selectPropertyById,
    selectRentalUnitsByPropertyId,
    selectTenancies,
    selectTenants,
} from '../../store/selectors';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { RentalUnitModel } from '../rental-unit/model/rental-unit.model';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { useReactToPrint } from 'react-to-print';
import RentSchedulePropertyTable from './tables/rent-schedule-property-table';
import RentScheduleUnitsTable from './tables/rent-schedule-units-table';
import * as propertyService from '../property/service/property.service';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';
import { emptyProperty } from '../property/model/property.model';
import * as tenancyService from '../tenancy/service/tenancy.service';

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

    const classes = useStyles();

    const { id } = useParams<{ id: string }>();

    // TODO: Use better approach for error handling
    const property = useAppSelector(selectPropertyById(id)) || emptyProperty;
    const rentalUnits = useAppSelector(selectRentalUnitsByPropertyId(id));
    const tenancies = useAppSelector(selectTenancies);
    const tenants = useAppSelector(selectTenants);

    return (
        <>
            <div className={classes.exportContainer}>
                <Button variant={'outlined'} onClick={handlePrint} endIcon={<GetAppOutlinedIcon />}>
                    Export as PDF
                </Button>
            </div>
            <Container ref={componentRef}>
                <Typography className={classes.title} variant={'h5'}>
                    Rent Schedule Report for {propertyService.getDisplayNameOfProperty(property)}
                </Typography>
                <RentSchedulePropertyTable {...property} />
                <RentScheduleUnitsTable
                    rentalUnits={rentalUnits}
                    getTenancy={(rentalUnit: RentalUnitModel) =>
                        tenancyService.getRunningTenancyByRentalUnitId(rentalUnit.id, tenancies)
                    }
                    tenants={tenants}
                />
            </Container>
        </>
    );
};

export default RentScheduleOverview;
