export type RentalUnitModel = {
    id: string;
    propertyId: string;
    ewid: number;
    type: typeof rentalUnitType[number];
    numberOfRooms?: number;
    surfaceInM2?: number;
    floorLevel?: typeof rentalUnitfloorLevel[number];
};

export const emptyRentalUnit: RentalUnitModel = {
    id: '',
    propertyId: '',
    ewid: 0,
    type: 'Apartment',
};

export const rentalUnitType = ['Parking Lot', 'Hobby Room', 'Apartment'] as const;

export const rentalUnitfloorLevel = [
    'Undefined',
    '3. Basement Floor',
    '2. Basement Floor',
    '1. Basement Floor',
    'Ground Floor',
    '1. Floor',
    '2. Floor',
    '3. Floor',
    '4. Floor',
    '5. Floor',
    '6. Floor',
    '7. Floor',
    '8. Floor',
    '9. Floor',
    '10. Floor',
] as const;

// Helper functions
export const getDisplayNameOfRentalUnit = (ru: RentalUnitModel) => {
    let resultString = '';

    if (ru.type === 'Apartment' || ru.type === 'Hobby Room') {
        resultString += `${ru.numberOfRooms} Room `;
    }

    resultString += ru.type;

    if (ru.floorLevel && ru.floorLevel !== 'Undefined') {
        resultString += `, ${ru.floorLevel}`;
    }

    return resultString + ` (${ru.ewid})`;
};
