import { emptyPerson, PersonModel } from '../model/person.model';
import * as personService from './person.service';

export const validDummyPerson: PersonModel = {
    ...emptyPerson,
    id: 'ge645634gr',
    firstName: 'Peter',
    lastName: 'Lustig',
    address: {
        addressLine1: 'Mattenweg 12',
        postCode: 8050,
        city: 'Zürich',
    },
    email: 'info@peterl.ch',
    roles: ['Tenant'],
};

export const invalidDummyPerson: PersonModel = {
    ...emptyPerson,
    firstName: 'Peter',
    lastName: 'Lustig',
    address: {
        addressLine1: 'Mattenweg 12',
        postCode: 8050,
        city: 'Zürich',
    },
    email: 'info@peterl.ch',
    roles: ['Tenant'],
};

test('Get display name (forms fields) of valid person', () => {
    // Arrange
    const expectedDisplayName = 'Peter Lustig (Zürich)';

    // Act
    const displayName = personService.getPersonDisplayNameForFormSelectFields(validDummyPerson);

    // Assert
    expect(displayName).toMatch(expectedDisplayName);
});

test('Get display name (forms fields) of invalid person', () => {
    // Arrange
    const expectedDisplayName = '';

    // Act
    const displayName = personService.getPersonDisplayNameForFormSelectFields(invalidDummyPerson);

    // Assert
    expect(displayName).toMatch(expectedDisplayName);
});

test('Sort collection of persons correctly', () => {
    // Arrange
    const list: PersonModel[] = [
        { ...emptyPerson, firstName: 'Hans', lastName: 'Meier' },
        { ...emptyPerson, firstName: 'Armin', lastName: 'Meier' },
    ];

    // Act
    personService.sortPersonsByLastAndFirstNameAsc(list);

    // Assert
    expect(list[0].firstName).toMatch('Armin');
});
