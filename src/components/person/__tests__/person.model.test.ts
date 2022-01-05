import { getPersonDisplayNameForFormSelectFields, PersonModel } from '../model/person.model';

export const dummyPerson: PersonModel = {
    id: 'ge645634gr',
    company: '',
    firstName: 'Peter',
    lastName: 'Lustig',
    birthday: null,
    address: {
        addressLine1: 'Mattenweg 12',
        postCode: 8050,
        city: 'Zürich',
    },
    email: 'info@peterl.ch',
    mobilePhone: null,
    landline: null,
    roles: ['Tenant'],
    createdBy: 'gvfgfdht564',
};

export const dummyPersonWithoutId: PersonModel = {
    id: '',
    company: '',
    firstName: 'Peter',
    lastName: 'Lustig',
    birthday: null,
    address: {
        addressLine1: 'Mattenweg 12',
        postCode: 8050,
        city: 'Zürich',
    },
    email: 'info@peterl.ch',
    mobilePhone: null,
    landline: null,
    roles: ['Tenant'],
    createdBy: 'gvfgfdht564',
};

test('call getPersonDisplayNameForFormSelectFields with dummy data', () => {
    expect(getPersonDisplayNameForFormSelectFields(dummyPerson)).toMatch('Peter Lustig (Zürich)');
});

test('call getPersonDisplayNameForFormSelectFields without id', () => {
    expect(getPersonDisplayNameForFormSelectFields(dummyPerson)).toMatch('');
});
