import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { PropertyModel } from '../model/property.model';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { RentalUnitModel } from '../../rental-unit/model/rental-unit.model';
import { TenancyModel } from '../../tenancy/model/tenancy.model';
import { parseISO } from 'date-fns';

type PropertyCardProps = {
    property: PropertyModel;
    handleDelete: () => void;
    rentalUnits: RentalUnitModel[];
    tenancies: TenancyModel[];
};

const useStyles = makeStyles((theme) => ({
    vacanciesInfo: {
        color: theme.palette.error.main,
    },
}));

const PropertyCard = ({ property, handleDelete, rentalUnits, tenancies }: PropertyCardProps) => {
    const cssClasses = useStyles();

    const numOfRUs = rentalUnits?.length ? rentalUnits.length : 0;

    const runningTs = tenancies?.filter((t) => !t.endOfContract || parseISO(t.endOfContract) > new Date());
    const numOfRunningTs = runningTs?.length ? runningTs.length : 0;

    const vacancies = runningTs?.filter((t) => t.isVacancy);
    const numOfVacancies = vacancies?.length ? vacancies.length : 0;

    return (
        <Card elevation={3}>
            <CardHeader
                action={
                    <IconButton
                        component={Link}
                        to={routes.getPropertyDetailRouteById(property.id)}
                        aria-label="Edit property"
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                }
                title={<Typography variant={'h6'}>{property.name}</Typography>}
                subheader={`EGID: ${property.egid}`}
            />
            <CardMedia
                component="img"
                alt="Property Placeholder Image"
                height="150"
                loading="lazy"
                // TODO: Use image from firestore storage
                image="https://cdn.pixabay.com/photo/2016/11/21/15/09/apartments-1845884_640.jpg"
                title="Property Placeholder Image"
            />
            <CardContent>
                <Typography variant="subtitle2">
                    {property.address.addressLine1}
                    <br />
                    {`${property.address.postCode} ${property.address.city}`}
                </Typography>

                <Typography variant="body1" component={'div'}>
                    <ul>
                        <li>
                            <strong>{numOfRUs}</strong> {`Rental Unit${numOfRUs !== 1 ? 's' : ''}`}
                        </li>
                        <li>
                            <strong>{numOfRunningTs - numOfVacancies}</strong>{' '}
                            {`running Tenanc${numOfRunningTs - numOfVacancies !== 1 ? 'ies' : 'y'}`}
                        </li>
                        <li className={numOfVacancies > 0 ? cssClasses.vacanciesInfo : undefined}>
                            <strong>{numOfVacancies}</strong> {`Vacanc${numOfVacancies !== 1 ? 'ies' : 'y'}`}
                        </li>
                    </ul>
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="Delete property" onClick={handleDelete}>
                    <DeleteOutlineIcon color={'error'} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PropertyCard;
