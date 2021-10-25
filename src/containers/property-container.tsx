import React from 'react';
import Property from '../components/Property/Property';

const PropertyContainer = () => {
    const handleEdit = () => {
        console.log('Edit property...');
    };

    return <Property handleEdit={handleEdit} />;
};

export default PropertyContainer;
