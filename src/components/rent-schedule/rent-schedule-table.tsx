import React from 'react';
import { useParams } from 'react-router-dom';

const RentScheduleTable = () => {
    const { id } = useParams<{ id: string }>();
    console.log('params: ', id);

    return <div>This will be a table for property: {id}</div>;
};

export default RentScheduleTable;
