import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { properties } from './dummy-properties';
import PropertyCard from './property-card/property-card';

const PropertiesView = () => {
    return (
        <Container>
            <Grid container spacing={3}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                        <PropertyCard {...property} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PropertiesView;
