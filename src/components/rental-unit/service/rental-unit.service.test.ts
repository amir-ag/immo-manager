import { emptyRentalUnit, RentalUnitModel } from '../model/rental-unit.model';
import * as rentalUnitService from './rental-unit.service';

test('Get display name of apartment correctly', () => {
    // Arrange
    const apartment: RentalUnitModel = {
        ...emptyRentalUnit,
        ewid: 123,
        type: 'Apartment',
        numberOfRooms: 4,
        floorLevel: '1. Floor',
        surfaceInM2: 85,
    };
    const expectedDisplayName = '4 Room Apartment, 1. Floor (123)';

    // Act
    const displayName = rentalUnitService.getDisplayNameOfRentalUnit(apartment);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Get display name of hobby room correctly', () => {
    // Arrange
    const hobbyRoom: RentalUnitModel = {
        ...emptyRentalUnit,
        ewid: 101,
        type: 'Hobby Room',
        numberOfRooms: 1,
        floorLevel: '2. Basement Floor',
        surfaceInM2: 15,
    };
    const expectedDisplayName = '1 Room Hobby Room, 2. Basement Floor (101)';

    // Act
    const displayName = rentalUnitService.getDisplayNameOfRentalUnit(hobbyRoom);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Get display name of parking lot correctly', () => {
    // Arrange
    const parkingLot: RentalUnitModel = {
        ...emptyRentalUnit,
        ewid: 200,
        type: 'Parking Lot',
        floorLevel: 'Undefined',
    };

    const expectedDisplayName = 'Parking Lot (200)';

    // Act
    const displayName = rentalUnitService.getDisplayNameOfRentalUnit(parkingLot);

    // Assert
    expect(displayName).toEqual(expectedDisplayName);
});

test('Get the correct rental units by property id', () => {
    // Arrange
    const sourceList: RentalUnitModel[] = [
        {
            ...emptyRentalUnit,
            propertyId: '1000a',
            ewid: 200,
            type: 'Parking Lot',
            floorLevel: 'Undefined',
        },
        {
            ...emptyRentalUnit,
            propertyId: '1000b',
            ewid: 200,
            type: 'Parking Lot',
            floorLevel: 'Undefined',
        },
        {
            ...emptyRentalUnit,
            propertyId: '1000a',
            ewid: 101,
            type: 'Hobby Room',
            numberOfRooms: 1,
            floorLevel: '2. Basement Floor',
            surfaceInM2: 15,
        },
    ];

    const expectedFilteredList: RentalUnitModel[] = [
        {
            ...emptyRentalUnit,
            propertyId: '1000a',
            ewid: 200,
            type: 'Parking Lot',
            floorLevel: 'Undefined',
        },
        {
            ...emptyRentalUnit,
            propertyId: '1000a',
            ewid: 101,
            type: 'Hobby Room',
            numberOfRooms: 1,
            floorLevel: '2. Basement Floor',
            surfaceInM2: 15,
        },
    ];

    // Act
    const filteredList = rentalUnitService.getRentalUnitsByPropertyId('1000a', sourceList);

    // Assert
    expect(filteredList).toEqual(expectedFilteredList);
});

test('Sort a list of rental units corretly', () => {
    // Arrange
    const sourceList: RentalUnitModel[] = [
        {
            ...emptyRentalUnit,
            floorLevel: 'Undefined',
        },
        {
            ...emptyRentalUnit,
        },
        {
            ...emptyRentalUnit,
            floorLevel: '2. Basement Floor',
        },
        {
            ...emptyRentalUnit,
            floorLevel: '7. Floor',
        },
        {
            ...emptyRentalUnit,
            floorLevel: '1. Floor',
        },
    ];

    const expectedSortedList: RentalUnitModel[] = [
        {
            ...emptyRentalUnit,
            floorLevel: 'Undefined',
        },
        {
            ...emptyRentalUnit,
        },
        {
            ...emptyRentalUnit,
            floorLevel: '2. Basement Floor',
        },
        {
            ...emptyRentalUnit,
            floorLevel: '1. Floor',
        },
        {
            ...emptyRentalUnit,
            floorLevel: '7. Floor',
        },
    ];

    // Act
    rentalUnitService.sortRentalUnitsByFloorLevelAsc(sourceList);

    // Assert
    expect(sourceList).toEqual(expectedSortedList);
});
