import React from 'react';
import {Container, Grid} from "@material-ui/core";
import PropertyCard from "../PropertyCard/PropertyCard";
import {properties} from './dummyData'
import {DashboardProps} from "./types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from "../Layout/Layout";


const Dashboard = ({handleEdit}: DashboardProps) => {

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path={'/dashboard'}>
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
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default Dashboard;
