import HomeWorkIcon from '@material-ui/icons/HomeWork';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';

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
        path: 'app/properties',
    },
    //{
    //    text: 'Tenancies',
    //    icon: <CompareArrowsIcon fontSize={'large'} color={'secondary'} />,
    //    path: '/tenancies',
    //},
    {
        text: 'Rent Schedule',
        icon: <AssignmentIcon fontSize={'large'} color={'secondary'} />,
        path: 'app/rent-schedule',
    },
];
