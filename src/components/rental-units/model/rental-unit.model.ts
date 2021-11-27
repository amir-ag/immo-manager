export type RentalUnitModel = {
    ewid: number;
    type: 'Parking Lot' | 'Hobby Room' | 'Apartment';
    numberOfRooms?: number;
    surfaceInM2?: number;
    floorLevel?: typeof floorLevel[number];
};

const floorLevel = [
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
