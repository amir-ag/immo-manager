import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {properties} from "../Dashboard/dummyData";
import PropertyCard from "../PropertyCard/PropertyCard";
import {PropertyProps} from "./types";

const Property = ({handleEdit}: PropertyProps) => {
    return (
        <Container>
            <Grid container spacing={3}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={3} key={property.id}>
                        <PropertyCard {...property} handleEdit={handleEdit}/>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    );
};

export default Property;
