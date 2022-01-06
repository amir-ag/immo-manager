import { emptyAddress } from '../../../models/address.model';
import { PropertyModel } from '../model/property.model';
import { getDisplayNameOfProperty } from '../service/property.service';

const dummyProperty: PropertyModel = {
    id: 'gfg56htghfg',
    name: 'MyHouse',
    egid: '432434',
    owner: 'Peter Lustig',
    janitor: 'Marina Meyer',
    address: emptyAddress,
};

const dummyPropertyWithoutEgid: PropertyModel = {
    id: 'gfg56htghfg',
    name: 'MyHouse',
    egid: '',
    owner: 'Peter Lustig',
    janitor: 'Marina Meyer',
    address: emptyAddress,
};

test('call getDisplayNameOfProperty with dummy data', () => {
    expect(getDisplayNameOfProperty(dummyProperty)).toMatch('MyHouse (432434)');
});

test('call getDisplayNameOfProperty without egid', () => {
    expect(getDisplayNameOfProperty(dummyPropertyWithoutEgid)).toMatch('MyHouse');
});
