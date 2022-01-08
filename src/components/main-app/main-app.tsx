import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/layout';
import PersonsOverview from '../person/overview/persons-overview';
import routes from '../../routes/route-constants';
import { DashboardContainer } from '../dashboard/dashboard.container';
import { RentSchedule } from '../rent-schedule/rent-schedule';
import ProfileDetail from '../profile/profile-detail';
import { RentalUnitDetail } from '../rental-unit/rental-unit-detail';
import { TenancyDetail } from '../tenancy/tenancy-detail';
import PropertiesOverview from '../property/overview/properties-overview';
import { PropertyDetail } from '../property/property-detail';
import RentScheduleOverview from '../rent-schedule/rent-schedule-overview';

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
                    {/* Profile */}
                    <Route path={routes.PROFILE}>
                        <ProfileDetail />
                    </Route>

                    {/* Dashboard */}
                    <Route path={routes.DASHBOARD}>
                        <DashboardContainer />
                    </Route>

                    {/* Persons */}
                    <Route path={routes.PERSONS}>
                        <PersonsOverview />
                    </Route>

                    {/* Properties */}
                    <Route exact path={routes.PROPERTIES_OVERVIEW}>
                        <PropertiesOverview />
                    </Route>
                    <Route path={routes.PROPERTIES_CREATE}>
                        <PropertyDetail isNew={true} />
                    </Route>
                    <Route path={routes.PROPERTIES_DETAIL}>
                        <PropertyDetail isNew={false} />
                    </Route>

                    {/* Rental Units */}
                    <Route path={routes.RENTAL_UNITS_CREATE}>
                        <RentalUnitDetail isNew={true} />
                    </Route>
                    <Route path={routes.RENTAL_UNITS_DETAIL}>
                        <RentalUnitDetail isNew={false} />
                    </Route>

                    {/* Tenancies */}
                    <Route path={routes.TENANCIES_CREATE}>
                        <TenancyDetail isNew={true} />
                    </Route>
                    <Route path={routes.TENANCIES_DETAIL}>
                        <TenancyDetail isNew={false} />
                    </Route>

                    {/* Rent Schedule */}
                    <Route exact={true} path={routes.RENT_SCHEDULE}>
                        <RentSchedule />
                    </Route>
                    <Route path={routes.RENT_SCHEDULE_DATA}>
                        <RentScheduleOverview />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
};

export default MainApp;
