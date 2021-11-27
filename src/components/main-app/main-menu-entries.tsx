import HomeWorkIcon from '@material-ui/icons/HomeWork';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WarningIcon from '@material-ui/icons/Warning';

import React from 'react';
import routes from '../../routes/route-constants';

export const mainMenuEntries = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon fontSize={'large'} color={'secondary'} />,
        path: routes.DASHBOARD,
    },
    {
        text: 'Persons',
        icon: <GroupIcon fontSize={'large'} color={'secondary'} />,
        path: routes.PERSONS,
    },
    {
        text: 'Properties',
        icon: <HomeWorkIcon fontSize={'large'} color={'secondary'} />,
        path: routes.PROPERTIES,
    },
    {
        text: 'Rent Schedule',
        icon: <AssignmentIcon fontSize={'large'} color={'secondary'} />,
        path: routes.RENT_SCHEDULE,
    },

    // TODO: Remove after creating views
    {
        text: 'TEMP - Property',
        icon: <WarningIcon fontSize={'large'} color={'secondary'} />,
        path: routes.TEMP_PROPERTY,
    },
    {
        text: 'TEMP - Rental Unit',
        icon: <WarningIcon fontSize={'large'} color={'secondary'} />,
        path: routes.TEMP_RENTAL_UNIT,
    },
    {
        text: 'TEMP - Tenancy',
        icon: <WarningIcon fontSize={'large'} color={'secondary'} />,
        path: routes.TEMP_TENANCY,
    },
];
