import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../layout/layout';
import PersonsContainer from '../persons/persons.container';
import routes from '../../routes/route-constants';
import { PropertiesContainer } from '../properties/properties.container';
import { DashboardContainer } from '../dashboard/dashboard.container';
import { RentScheduleContainer } from '../rent-schedule/rent-schedule.container';

// Props
type MainAppProps = {
    menuItems: MenuItems[];
};

type MenuItems = {
    text: string;
    icon: JSX.Element;
    path: string;
};

const MainApp = ({ menuItems }: MainAppProps) => {
    return (
        <Router>
            <Layout menuItems={menuItems}>
                <Switch>
                    <Route path={routes.DASHBOARD}>
                        <DashboardContainer />
                    </Route>
                    <Route path={routes.PERSONS}>
                        <PersonsContainer />
                    </Route>
                    <Route path={routes.PROPERTIES}>
                        <PropertiesContainer />
                    </Route>
                    <Route path={routes.RENT_SCHEDULE}>
                        <RentScheduleContainer />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default MainApp;
