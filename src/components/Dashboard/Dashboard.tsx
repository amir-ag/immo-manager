import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PersonsContainer from '../People/persons-container';
import routes from '../../routes/route-constants';
import { DashboardProps } from './types';
import { PropertiesContainer } from '../properties/properties-container';

const Dashboard = ({ menuItems }: DashboardProps) => {
    return (
        <Router>
            <Layout menuItems={menuItems}>
                <Switch>
                    <Route exact path={routes.DASHBOARD}>
                        <PropertiesContainer />
                    </Route>
                    <Route path={routes.PERSONS}>
                        <PersonsContainer />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default Dashboard;
