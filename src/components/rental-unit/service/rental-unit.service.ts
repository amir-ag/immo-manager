import { RentalUnitModel } from '../model/rental-unit.model';

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

export const getRentalUnitsByPropertyId = (propertyId: string, rentalUnits: RentalUnitModel[]) =>
    rentalUnits.filter((ru) => ru.propertyId === propertyId);
