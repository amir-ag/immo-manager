import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
} from '@material-ui/core';
import { PropertyModel } from '../model/property.model';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

type PropertyCardProps = {
    property: PropertyModel;
    handleDelete: () => void;
};

const PropertyCard = ({ property, handleDelete }: PropertyCardProps) => {
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
                    {/* TODO: Use actual data from firestore */}
                    <ul>
                        <li>5 Rental Unit</li>
                        <li>5 Running Tenancies</li>
                        <li>0 Vacancies</li>
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
