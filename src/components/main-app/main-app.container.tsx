import React from 'react';
import MainApp from './main-app';
import { mainMenuEntries } from './main-menu-entries';

const MainAppContainer = () => {
    return <MainApp menuItems={mainMenuEntries} />;
};

export default MainAppContainer;
