import React from 'react';
import {Container, Grid} from "@material-ui/core";
import PropertyCard from "../PropertyCard/PropertyCard";
import {properties} from './dummyData'
import {DashboardProps} from "./types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from "../Layout/Layout";
import PeopleContainer from "../../containers/people-container";


const Dashboard = ({handleEdit}: DashboardProps) => {

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path={'/dashboard'}>
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
                    <Route path={'/dashboard/people'}>
                        <PeopleContainer />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default Dashboard;
