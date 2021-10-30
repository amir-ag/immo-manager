import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PersonsContainer from '../../containers/persons-container';
import routes from '../../routes/constant';
import PropertyContainer from '../../containers/property-container';
import { DashboardProps } from './types';

const Dashboard = ({ menuItems }: DashboardProps) => {
    return (
        <Router>
            <Layout menuItems={menuItems}>
                <Switch>
                    <Route exact path={routes.DASHBOARD}>
                        <PropertyContainer />
                    </Route>
                    <Route path={routes.PEOPLE}>
                        <PersonsContainer />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default Dashboard;
