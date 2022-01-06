import { RentalUnitModel } from '../model/rental-unit.model';
import { getDisplayNameOfRentalUnit } from '../service/rental-unit.service';

const dummyRentalUnit: RentalUnitModel = {
    id: 'fsdtr4545',
    propertyId: 'greger65645',
    ewid: 54365,
    type: 'Apartment',
    numberOfRooms: 4,
};

const parkinglot: RentalUnitModel = {
    id: 'fsdtr4545',
    propertyId: 'greger65645',
    ewid: 54365,
    type: 'Parking Lot',
};

test('call getDisplayNameOfRentalUnit with dummy data', () => {
    expect(getDisplayNameOfRentalUnit(dummyRentalUnit)).toMatch('4 Room Apartment (54365)');
});
test('call getDisplayNameOfRentalUnit with dummy data', () => {
    expect(getDisplayNameOfRentalUnit(parkinglot)).toMatch('Parking Lot (54365)');
});
