import React from 'react';
import { PropertyData } from './types';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const PropertyCard = ({ street, city, details, owner, handleEdit }: PropertyData) => {
    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                    avatar={<Avatar>{owner[0].toUpperCase()}</Avatar>}
                    action={
                        <IconButton onClick={(e) => handleEdit(e)} aria-label="edit-property">
                            <EditIcon />
                        </IconButton>
                    }
                    title={street}
                    subheader={city}
                />
                <CardContent>
                    <Typography variant={'body2'} color={'textSecondary'}>
                        {details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default PropertyCard;
