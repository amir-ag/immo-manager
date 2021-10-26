import React from 'react';
import Dashboard from './Dashboard';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

const DashboardContainer = () => {
    const menuItems = [
        {
            text: 'Properties',
            icon: <HomeWorkOutlinedIcon color={'secondary'} />,
            path: '/dashboard/',
        },
        {
            text: 'People',
            icon: <PersonAddOutlinedIcon color={'secondary'} />,
            path: '/dashboard/people',
        },
        {
            text: 'Contracts',
            icon: <NoteOutlinedIcon color={'secondary'} />,
            path: '/dashboard/contracts',
        },
        {
            text: 'Tenant Overview',
            icon: <GroupOutlinedIcon color={'secondary'} />,
            path: '/dashboard/tenants',
        },
    ];

    return <Dashboard menuItems={menuItems} />;
};

export default DashboardContainer;
