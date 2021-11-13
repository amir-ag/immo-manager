import React from 'react';
import Dashboard from './Dashboard';
import { mainMenuEntries } from './main-menu-entries';

const DashboardContainer = () => {
    return <Dashboard menuItems={mainMenuEntries} />;
};

export default DashboardContainer;
