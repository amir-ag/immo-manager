import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import { PropertyModel } from '../model/property.model';
import { Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import routes from '../../../routes/route-constants';

const PropertyCard = ({ id, egid, name, address }: PropertyModel) => {
    return (
        <Card elevation={3}>
            <CardHeader
                action={
                    <IconButton
                        component={Link}
                        to={routes.getPropertyDetailRouteById(id)}
                        aria-label="settings"
                    >
                        <Edit />
                    </IconButton>
                }
                title={<Typography variant={'h6'}>{name}</Typography>}
                subheader={`EGID: ${egid}`}
            />
            <CardMedia
                component="img"
                alt="Property Placeholder Image"
                height="150"
                loading="lazy"
                // TODO: Use local placeholder image
                image="https://cdn.pixabay.com/photo/2016/11/21/15/09/apartments-1845884_640.jpg"
                title="Property Placeholder Image"
            />
            <CardContent>
                <Typography variant="subtitle2">
                    {address.addressLine1}
                    <br />
                    {`${address.postCode} ${address.city}`}
                </Typography>

                <Typography variant="body1" component={'div'}>
                    <ul>
                        <li>5 Rental Unit</li>
                        <li>5 Running Tenancies</li>
                        <li>0 Vacancies</li>
                    </ul>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
